import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { getCities, addCoverageArea } from ".././../../../../../../store/actions";

function AddMoreCoverageItem(props) {
  const [pickupStatesValues, setPickupStatesValues] = useState(null);
  const [deliveryStatesValues, setDeliveryStatesValues] = useState(null);

  const [selectedPickupStateOption, setSelectedPickupStateOption] = useState(null);
  const [selectedDeliveryStateOption, setSelectedDeliveryStateOption] = useState(null);

  const [pickupCityValues, setPickupCityValues] = useState(null);
  const [deliveryCityValues, setDeliveryCityValues] = useState(null);

  const [selectedPickupCityOption, setSelectedPickupCityOption] = useState(null);
  const [selectedDeliveryCityOption, setSelectedDeliveryCityOption] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.states) {
      const states = props.states.map((item) => {
        return { value: item._id, label: item.stateName };
      });
      setPickupStatesValues(states);
      setDeliveryStatesValues(states);
    }
  }, [props.states]);

  const onChangePickupStatesValue = (selectedOption) => {
    setSelectedPickupStateOption(selectedOption);
    dispatch(getCities({ id: selectedOption.value }))
      .then((res) => {
        const cities = res.map((item) => {
          return {
            value: item._id,
            label: item.city,
          };
        });
        setPickupCityValues(cities);
      })
      .catch((err) => {});
  };
  const onChangeDiliveryStatesValue = (selectedOption) => {
    setSelectedDeliveryStateOption(selectedOption);
    dispatch(getCities({ id: selectedOption.value }))
      .then((res) => {
        const cities = res.map((item) => {
          return {
            value: item._id,
            label: item.city,
          };
        });
        setDeliveryCityValues(cities);
      })
      .catch((err) => {});
  };

  const onChangePickupCityValue = (selectedOption) => {
    setSelectedPickupCityOption(selectedOption);
  };
  const onChangeDiliveryCityValue = (selectedOption) => {
    setSelectedDeliveryCityOption(selectedOption);
  };

  function onSaveRoute() {
    const payload = {
      user: props.user.userId || props.user._id,
      pickup_city: selectedPickupCityOption.value,
      delivery_city: selectedDeliveryCityOption.value,
    };
    dispatch(addCoverageArea(payload));
  }

  return (
    <div className="fields-wrp manage-coverage-area">
      <div className="address-sec">
        <div className="select-bar">
          <label>Pickup</label>
          <div className="select-group">
            <Select
              className="select"
              value={selectedPickupStateOption}
              onChange={onChangePickupStatesValue}
              options={pickupStatesValues}
            />
            <Select
              className="select"
              value={selectedPickupCityOption}
              onChange={onChangePickupCityValue}
              options={pickupCityValues}
            />
          </div>
        </div>
        <div className="select-bar">
          <label>Delivery</label>
          <div className="select-group">
            <Select
              className="select"
              value={selectedDeliveryStateOption}
              onChange={onChangeDiliveryStatesValue}
              options={deliveryStatesValues}
            />
            <Select
              className="select"
              value={selectedDeliveryCityOption}
              onChange={onChangeDiliveryCityValue}
              options={deliveryCityValues}
            />
          </div>
        </div>
      </div>
      <div className="btn-wrp">
        <button className="btn btn-save" type="button" onClick={onSaveRoute}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddMoreCoverageItem;
