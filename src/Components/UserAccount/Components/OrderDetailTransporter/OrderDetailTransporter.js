import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { parse } from "query-string";
import { IoIosCheckmarkCircle, IoIosCall } from "react-icons/io";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { path as ramdaPath } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import { getOrder, acceptOrder, updateTrackingStatus } from "../../../../store/actions";
import Select from "react-select";

import PickupDetails from "../OrderDetailUser/Components/PickupDetails";
import DropoffDetails from "../OrderDetailUser/Components/DropoffDetails";

function Order(props) {
  const { userDetails } = props;
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const order = useSelector((state) => ramdaPath(["orders", "orderDetail", "orders"], state));

  const params = useParams();
  const query = parse(location.search);
  useEffect(() => {
    dispatch(getOrder(params))
      .then((item) => {})
      .catch((err) => {});
  }, []);

  const handleUpdateStatus = () => {
    if (!selectedStatusOption) return null;
    //call update status api
    if (selectedStatusOption.label === "Accepted") {
      dispatch(acceptOrder({ accepted: true, order_id: params.id }))
        .then((item) => {
          dispatch(getOrder(params))
            .then((item) => {
              setSelectedStatusOption(null);
            })
            .catch((err) => {});
        })
        .catch((item) => {});
    } else {
      dispatch(
        updateTrackingStatus({
          order_id: params.id,
          status_id: selectedStatusOption._id,
          status_value: true,
        })
      )
        .then((item) => {
          dispatch(getOrder(params))
            .then((item) => {
              setSelectedStatusOption(null);
            })
            .catch((err) => {});
        })
        .catch((item) => {});
    }

    // If transporter is accepting order - Call update status api also//
    // show success toast //
  };

  if (!order) {
    return null;
  }

  const updatedStatusItems = [];
  const statusToBeUpdated = [];
  let remainingStatusItems = [];

  // option for update status dropdown //
  if (order.order_status) {
    if (order.order_status.filter((item) => item && item.label === "Accepted").length === 0) {
      order.order_status.splice(2, 0, order.accepted);
    }
    for (let i = 0; i < order.order_status.length; i++) {
      //TODO: once shipping complete from use end. Put condition to disable status update for shipping for transporter end.
      if (!order.order_status[i].value) {
        statusToBeUpdated.push({
          value: order.order_status[i].value, //to be updated at BE
          label: order.order_status[i].label,
          _id: order.order_status[i]._id,
        });
        break;
      } else {
        updatedStatusItems.push(order.order_status[i]);
      }
    }
    remainingStatusItems = order.order_status.slice(
      updatedStatusItems.length + statusToBeUpdated.length
    );
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
                <div className={`status-bar  ${item.value ? "active" : ""}`}>
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
            {statusToBeUpdated.length > 0 && (
              <div className="update-status-wrp status-bar  active">
                <div className="select-wrp">
                  <div className="label">{statusToBeUpdated[0] && statusToBeUpdated[0].label}</div>
                  <Select
                    key={selectedStatusOption && selectedStatusOption._id}
                    className=""
                    defaultValue={selectedStatusOption}
                    options={statusToBeUpdated}
                    isClearable
                    onChange={(selectedOption) => setSelectedStatusOption(selectedOption)}
                  />
                </div>
                <Button onClick={handleUpdateStatus} className="btn">
                  Update Status
                </Button>
              </div>
            )}
            {remainingStatusItems.map((item, index) => {
              return (
                <div className={`status-bar`}>
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
