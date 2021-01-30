import React from "react";
import { Button } from "react-bootstrap";

function DropoffDetails(props) {
  const { order, canEdit } = props;
  return (
    <div className="detail-row ">
      <div className="row">
        <div className="col-4">
          <div className="bold label">Deliver To</div>
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col-4 title">Contact Person</div>
            <div className="col-6">
              <div>Amit S</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 title">Address Line</div>
            <div className="col-6">
              <div>{order.dropoff_address_line && order.dropoff_address_line}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 title">City</div>
            <div className="col-6">
              <div>{order.dropoffCity && order.dropoffCity.city}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 title">State</div>
            <div className="col-6">
              <div>
                {order.dropoffState && order.dropoffState.stateName}{" "}
                {order.dropoffState && order.dropoffState.pincode}
              </div>
            </div>
          </div>
        </div>
        {canEdit && (
          <div className="col-3 actions">
            <Button>Edit</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropoffDetails;
