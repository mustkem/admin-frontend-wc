import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { path as ramdaPath } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import { getOrder, shipOrder, getOrders } from "../../../../store/actions";
import PickupDetails from "./Components/PickupDetails";
import DropoffDetails from "./Components/DropoffDetails";

function Order() {
  const userDetails = useSelector((state) => {
    return state.user.user;
  });
  const dispatch = useDispatch();

  const order = useSelector((state) => ramdaPath(["orders", "orderDetail", "orders"], state));

  const params = useParams();

  useEffect(() => {
    dispatch(getOrder(params))
      .then((item) => {})
      .catch((err) => {});
  }, []);

  if (!order) {
    return null;
  }

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

  return (
    <div className="order-detail-sec">
      <div className="order-id">
        <span className="bold">Order ID </span>
        <span>{order.order_id}</span>
      </div>

      <div className="detail-row">
        <div className="row">
          <div className="col-12 title-main">Tracking Details</div>
        </div>
        <div className="status-sec">
          <div className="status-wrp">
            {updatedStatusItems.map((item, index) => {
              if (!item.value || item.label === "Returned") {
                return null;
              }
              return (
                <div key={index} className={`status-bar  ${item.value ? "active" : ""}`}>
                  <span
                    className={`dot ${index < updatedStatusItems.length - 1 ? "arrow" : ""} ${
                      item.value ? "active" : ""
                    }`}
                  >
                    <IoIosCheckmarkCircle className={`inner-dot ${item.value ? "active" : ""}`} />
                  </span>
                  <div className="status">
                    <div>{item.label}</div>
                    {item.value && <div>{moment(item.updated_at).format("h:mm A MMMM Do YY")}</div>}
                  </div>
                </div>
              );
            })}
            {remainingStatusItems.map((item, index) => {
              return (
                <div key={index} className={`status-bar`}>
                  <span className={`dot ${index < remainingStatusItems.length - 1 ? "arrow" : ""}`}>
                    <IoIosCheckmarkCircle className={`inner-dot`} />
                  </span>
                  <div className="status">
                    <div>{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <PickupDetails order={order} />
      <DropoffDetails order={order} />
      <div className="detail-row ">
        <div className="row">
          <div className="col-4">
            <div className="bold label">Package Details</div>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col-4 title">Package Weight</div>
              <div className="col-6">
                <div>20 KG</div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 title">Package Type</div>
              <div className="col-6">
                <div>Liquid</div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 title">Vehicle</div>
              <div className="col-6">
                <div>Flat Truck</div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 title">Description</div>
              <div className="col-6">
                <div>
                  This package contains food items. This package contains food items. This package
                  contains food items. This package contains food items. This package contains food
                  items.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
