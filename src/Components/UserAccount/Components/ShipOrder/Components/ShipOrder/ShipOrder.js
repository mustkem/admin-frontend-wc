import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { parse } from "query-string";
import { IoIosCheckmarkCircle, IoIosCall } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { RiTruckLine } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import { MdStars } from "react-icons/md";
import { AiOutlineContacts } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { path as ramdaPath } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import { getOrder, getTransportors, shipOrder, getOrders } from "../../../../../../store/actions";
import PickupDetails from "../../../OrderDetail/Components/PickupDetails";
import DropoffDetails from "../../../OrderDetail/Components/DropoffDetails";
import Loader from "../../../../../Shared/MainLoader";

function ShipOrder() {
  const userDetails = useSelector((state) => {
    return state.user.user;
  });
  const dispatch = useDispatch();
  const location = useLocation();
  let history = useHistory();

  const [transportorsList, setTransportorsList] = useState([]);
  const [selectedTransporter, setselectedTransporter] = useState({});

  const [loadingOrder, setLoadingOrder] = useState(true);

  const order = useSelector((state) => {
    return ramdaPath(["orders", "orderDetail", "orders"], state)
      ? ramdaPath(["orders", "orderDetail", "orders"], state)
      : {};
  });

  const params = useParams();
  const query = parse(location.search);

  useEffect(() => {
    setLoadingOrder(true);
    dispatch(getOrder(params))
      .then((item) => {
        setLoadingOrder(false);

        const payload = {
          pickup_city: item.pickupCity._id,
          delivery_city: item.dropoffCity._id,
        };
        dispatch(getTransportors(payload))
          .then((data) => {
            const filteredData = data && data.filter((item) => Object.keys(item).length > 0);
            setTransportorsList(filteredData);
            if (filteredData.length > 0) {
              setselectedTransporter(filteredData[0].users);
            }
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setLoadingOrder(false);
      });
  }, []);

  const updateSelectedTranporter = (obj) => {
    setselectedTransporter(obj);
  };

  const updatedStatusItems = [];
  let remainingStatusItems = [];

  // option for update status dropdown //
  if (order.order_status) {
    if (order.order_status.filter((item) => item && item.label === "Accepted").length === 0) {
      order.order_status.splice(2, 0, order.accepted);
    }
    for (let i = 0; i < order.order_status.length; i++) {
      const item = order.order_status[i];
      //TODO: once shipping complete from use end. Put condition to disable status update for shipping for transporter end.
      if (order.order_status[i].value) {
        updatedStatusItems.push(item);
      } else {
        remainingStatusItems.push(item);
      }
    }
  }

  const handleUpdateStatusAndShip = () => {
    // call action and redirect to payment page //
    dispatch(
      shipOrder({
        selected_transporter: selectedTransporter._id,
        status_id: order.order_status[1]._id,
        order_id: order._id,
        status_value: true,
        target_user_type: "transporter_user",
      })
    )
      .then((data) => {
        history.push("/dashboard/orders");
        dispatch(getOrders(userDetails._id || userDetails.userId));
      })
      .catch((err) => {});
  };

  if (loadingOrder) {
    return (
      <div className="order-detail-sec">
        <Loader />
      </div>
    );
  }

  return (
    <div className="order-detail-sec">
      <div className="order-id">
        <span className="bold">Order ID</span>
        <span>{order.order_id}</span>
      </div>
      <div className="ship-sec">
        <div className="title-main">Select Transporter</div>
        <div className="carrier-section">
          <ul>
            {transportorsList &&
              transportorsList.length > 0 &&
              transportorsList.map((item) => {
                item = item.users;

                return (
                  <li
                    onClick={() => updateSelectedTranporter(item)}
                    className={`flex ${
                      selectedTransporter && selectedTransporter._id === item._id ? "selected" : ""
                    }`}
                  >
                    <div className="dtl-sec flex">
                      <div className="dtl-itm flex">
                        <input
                          type="checkbox"
                          checked={`${
                            selectedTransporter && selectedTransporter._id === item._id
                              ? "checked"
                              : ""
                          }`}
                        />
                      </div>
                      <div className="dtl-itm">
                        <div className="title">{item.company_name}</div>
                        <div>
                          <span>Min. weight: </span>
                          <span>100kg</span>
                        </div>
                      </div>
                      <div className="dtl-itm">
                        <RiTruckLine className="icon" />
                      </div>
                      <div className="dtl-itm">
                        <IoIosCall className="icon" />
                        <div>Call Before Delivery:</div>
                        <div>Available</div>
                      </div>
                      <div className="dtl-itm">
                        <AiOutlineContacts className="icon" />
                        <div>Delivery Person Number: </div>
                        <div>Available</div>
                      </div>
                      <div className="dtl-itm">
                        <MdStars className="icon rating" />
                        <div>4.5</div>
                      </div>
                      <div className="dtl-itm">
                        <FcApproval className="icon" />
                        <div>Verified</div>
                      </div>
                    </div>
                    <div className="rs-sec">
                      <div className="price">
                        <span className="bold icon">
                          <BiRupee className="bold" />
                          2000
                        </span>

                        <div className="total">Total charges: 2,000</div>
                      </div>
                      <div className="success bold">Pickup Available: Monday</div>
                      <div className="date">
                        Estimated Delivery:
                        <div> Aug 28, 2020</div>
                      </div>
                    </div>
                  </li>
                );
              })}
            {transportorsList && transportorsList.length === 0 && (
              <li className="flex">
                <div className="dtl-sec flex">No Carrier is available for this route.</div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <PickupDetails order={order} />
      <DropoffDetails order={order} />
      <div className="btn-wrp">
        <div className="left-sec">
          <Button onClick={handleUpdateStatusAndShip} className="btn">
            Ship with {selectedTransporter.company_name}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShipOrder;
