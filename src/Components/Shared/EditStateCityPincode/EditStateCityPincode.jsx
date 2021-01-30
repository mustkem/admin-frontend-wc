import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { getCities, getPincodes } from "../../../store/actions";

function EditStateCityPincode(props) {
  const [stateOptions, setStateOptions] = useState([]);

  const [selectedStateOption, setSelectedStateOption] = useState(null);

  const [cityOptions, setCityOptions] = useState([]);

  const [selectedCityOption, setSelectedCityOption] = useState(null);

  const [pincodeOptions, setPincodeOptions] = useState([]);

  const [selectedPincodeOption, setSelectedPincodeOption] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const statesData =
      props.states &&
      props.states.map((item) => {
        return { value: item._id, label: item.stateName };
      });
    setStateOptions(statesData);
  }, [props.states]);

  const onChangeStateOption = (selectedOption) => {
    setSelectedStateOption(selectedOption);
    setSelectedCityOption(null);
    setSelectedPincodeOption(null);
    props.updateFormPayload({ stateId: selectedOption.value, cityId: null, pincodeId: null });
    dispatch(getCities({ id: selectedOption.value }))
      .then((res) => {
        const cities = res.map((item) => {
          return {
            value: item._id,
            label: item.city,
          };
        });
        setCityOptions(cities);
      })
      .catch((err) => {});
  };

  const onChangeCityOption = (selectedOption) => {
    setSelectedCityOption(selectedOption);
    setSelectedPincodeOption(null);
    props.updateFormPayload({ cityId: selectedOption.value, pincodeId: null });

    dispatch(getPincodes({ stateId: selectedStateOption.value, cityId: selectedOption.value }))
      .then((res) => {
        const pincodes = res.map((item) => {
          return {
            value: item._id,
            label: item.pincode,
          };
        });
        setPincodeOptions(pincodes);
      })
      .catch((err) => {});
  };

  const onChangePincodeOption = (selectedOption) => {
    setSelectedPincodeOption(selectedOption);
    props.updateFormPayload({ pincodeId: selectedOption.value });
  };

  return (
    <>
      <div className="select-bar">
        <label>State</label>
        <div className="select-group">
          <Select
            className="select"
            value={selectedStateOption}
            onChange={onChangeStateOption}
            options={stateOptions}
          />
        </div>
      </div>
      <div className="select-bar">
        <label>City</label>
        <div className="select-group">
          <Select
            className="select"
            value={selectedCityOption}
            onChange={onChangeCityOption}
            options={cityOptions}
          />
        </div>
      </div>
      <div className="select-bar">
        <label>Pincode</label>
        <div className="select-group">
          <Select
            className="select"
            value={selectedPincodeOption}
            onChange={onChangePincodeOption}
            options={pincodeOptions}
          />
        </div>
      </div>
    </>
  );
}

export default EditStateCityPincode;
