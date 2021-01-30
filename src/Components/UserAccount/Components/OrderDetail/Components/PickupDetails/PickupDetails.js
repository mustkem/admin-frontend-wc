import React from "react";
import { Button } from "react-bootstrap";

function PickupDetails(props) {
  const { order, canEdit } = props;
  return (
    <div className="detail-row ">
      <div className="row">
        <div className="col-4">
          <div className="bold label">Pickup From</div>
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
              <div>H-1, C2, Ward-1</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 title">City</div>
            <div className="col-6">
              <div>{order.pickupCity && order.pickupCity.city}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 title">State</div>
            <div className="col-6">
              <div>
                {order.pickupState && order.pickupState.stateName}{" "}
                {order.pickupPincode && order.pickupPincode.pincode}
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

export default PickupDetails;
