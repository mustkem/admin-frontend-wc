import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addAddress } from ".././../../../../../../store/actions";
import EditStateCityPincode from "../../../../../../Shared/EditStateCityPincode/EditStateCityPincode";

function AddMoreCoverageItem(props) {
  const [address_line, setAddressLine] = useState("");
  const dispatch = useDispatch();
  const [formPayload, setFormPayload] = useState({});

  function updateFormPayload(nextState) {
    setFormPayload({ ...formPayload, ...nextState });
  }

  function onSaveAddress(e) {
    e.preventDefault();
    console.log(formPayload, address_line);
    const payload = {
      ...formPayload,
      address_line,
      userId: props.user.id || props.user.userId,
      is_default: props.addresses && props.addresses.length === 0 ? true : false,
    };
    dispatch(addAddress(payload));
  }

  return (
    <div className="fields-wrp manage-coverage-area">
      <form className="form-sec">
        <div className="address-lines">
          <div className="add-address-wrp">
            <div className="ip-field-wrp">
              <label>Address line</label>
              <input
                className="form-control"
                value={address_line}
                onChange={(e) => {
                  setAddressLine(e.target.value);
                }}
                type="text"
                placeholder="Enter"
              />
            </div>

            <EditStateCityPincode states={props.states} updateFormPayload={updateFormPayload} />
          </div>
          <div className="btn-wrp">
            <button className="btn btn-save" type="submit" onClick={onSaveAddress}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddMoreCoverageItem;
