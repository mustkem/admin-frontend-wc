import React from "react";
import { FiEdit } from "react-icons/fi";
import Button from "react-bootstrap/Button";

import EditStateCityPincode from "../../../../../Shared/EditStateCityPincode/EditStateCityPincode";

function PriceSetting() {
  return (
    <div className="my-account-content-bg">
      <div className="my-account-content-sec ">
        <div className="price-setting-sec">
          <div className="mb-15 ">
            <div className="mb-15 head">
              <span>Price Per Kilometer</span>
              <span className="icon">
                <FiEdit />
              </span>
            </div>
            <div>17</div>
          </div>

          <div className="mb-15">
            <div className="mb-15 head">Price Calculator</div>
            <div className="row">
              <div className="col-6">
                <div className="mb-15">From</div>
                <EditStateCityPincode states={[]} updateFormPayload={() => {}} />
              </div>
              <div className="col-6">
                <div className="mb-15">To</div>
                <EditStateCityPincode states={[]} updateFormPayload={() => {}} />
              </div>
            </div>
            <div className="btn-wrp">
              <Button>Find</Button>
            </div>
          </div>
          <div className="mb-15">
            <div className="mb-15 head">Price on popular routes (per ton)</div>
            <ul>
              <li className="mb-15">
                <div className="row">
                  <div className="col-10">Patna to Ajamgarh</div>
                  <div className="col-2">900</div>
                </div>
              </li>
              <li className="mb-15">
                <div className="row">
                  <div className="col-10">Delhi to Chandigarh</div>
                  <div className="col-2">700</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-100"></div>
        </div>
      </div>
    </div>
  );
}

export default PriceSetting;
