import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import { checkValidity } from "../../../../../../utils/utility";
// import TransporterListModal from "../TransporterListModal/TransporterListModal";

import { orderStatus } from "../../../../../../utils/constants";
import {
  addNewOrder,
  getMaterialTypes,
  getVehicleTypes,
  getOrders,
} from "../../../../../../store/actions";

import EditStateCityPincode from "../../../../../Shared/EditStateCityPincode/EditStateCityPincode";
import InitialFormData from "./add-order-form-config";
import ButtonSpinner from "../../../../../Shared/ButtonSpinner";

function AdOrderForm({ user, addresses, states }) {
  const [loadingAddOrder, setLoadingAddOrder] = useState(false);

  // const [selectedTransporter, setselectedTransporter] = useState();
  // const [pickupAddressIndex, setPickupAddressIndex] = useState(null);

  const [addressFormPayload, setAddressFormPayload] = useState({});
  const [pickupAddressFormPayload, setPickupAddressFormPayload] = useState({});

  const [formData, setFormData] = useState(() => InitialFormData);

  const [selectedMaterialType, setSelectedMaterialType] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [materialList, setMaterialList] = useState(null);
  const [vehicleList, setVehicleList] = useState(null);

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(getMaterialTypes()).then((data) => {
      const updatedData =
        data.Materials &&
        data.Materials.map((item) => {
          return {
            value: item._id,
            label: item.label,
          };
        });
      setMaterialList(updatedData);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVehicleTypes()).then((data) => {
      const updatedData =
        data.Vehicles &&
        data.Vehicles.map((item) => {
          return {
            value: item._id,
            label: item.label,
          };
        });
      setVehicleList(updatedData);
    });
  }, [dispatch]);

  const handleChangeFormField = (event) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: {
        ...formData[event.target.name],
        value: event.target.value,
        valid: checkValidity(event.target.value, formData[event.target.name].validation),
        touched: true,
      },
    };

    let isFormValid = true;
    for (let name in updatedFormData) {
      isFormValid = updatedFormData[name].valid && isFormValid;
    }
    setFormData(updatedFormData);
  };

  function updateAddressFormPayload(nextState) {
    setAddressFormPayload({ ...addressFormPayload, ...nextState });
  }

  function updatePickupAddressFormPayload(nextState) {
    setPickupAddressFormPayload({ ...pickupAddressFormPayload, ...nextState });
  }

  const [tabActiveState, settabActiveState] = useState({
    dropOff: true,
    pickUp: false,
    packageDetails: false,
    transportersList: false,
  });

  function handleNext(tabType) {
    let updatedTabActiveState = {
      ...tabActiveState,
      [tabType]: !tabActiveState[tabType],
    };
    settabActiveState(updatedTabActiveState);

    // animate //
    if (typeof tabType == "string") {
      setTimeout(() => {
        const top =
          window.scrollY +
          document.querySelectorAll(`.${tabType}-section`)[0].getBoundingClientRect().top -
          20;
        window.scrollTo({ top, behavior: "smooth" });
      }, 100);
    }
  }

  const handleCheckValidity = (tabType, fields) => {
    let shouldMoveNext = true;
    const updatedFormData = { ...formData };
    fields.forEach((key) => {
      updatedFormData[key].valid = checkValidity(
        updatedFormData[key].value,
        updatedFormData[key].validation
      );
      updatedFormData[key].touched = true;
    });
    setFormData(updatedFormData);
    fields.forEach((key) => {
      shouldMoveNext = formData[key].valid && shouldMoveNext;
    });
    if (shouldMoveNext) handleNext(tabType);
  };

  function handleToggle(tabType) {
    let updatedTabActiveState = {
      ...tabActiveState,
      [tabType]: !tabActiveState[tabType],
    };
    settabActiveState(updatedTabActiveState);
  }

  // function getTransportorsList() {
  //   const payload = {
  //     pickup_city: pickupAddressFormPayload.cityId,
  //     delivery_city: addressFormPayload.cityId,
  //   };

  //   dispatch(getTransportors(payload))
  //     .then((data) => {
  //       const filteredData = data && data.filter((item) => Object.keys(item).length > 0);
  //       setTransportorsList(filteredData);
  //       if (filteredData && filteredData.length > 0) {
  //         setselectedTransporter(filteredData[0].users._id);
  //       }
  //     })
  //     .catch((error) => {
  //       setTransportorsList([]);
  //     });
  // }

  // const selectedTransporterData = (id) => {
  //   setselectedTransporter(id);
  // };

  const handleSubmit = () => {
    const formPayload = {};
    Object.keys(formData).forEach((key) => {
      formPayload[key] = formData[key].value;
    });

    const payload = {
      ...formPayload,
      dropoff_city: addressFormPayload.cityId,
      dropoff_state: addressFormPayload.stateId,
      dropoff_pincode: addressFormPayload.pincodeId,

      pickup_city: pickupAddressFormPayload.cityId,
      pickup_state: pickupAddressFormPayload.stateId,
      pickup_pincode: pickupAddressFormPayload.pincodeId,

      vehicle_type: selectedVehicleType.value,
      material_type: selectedMaterialType.value,

      order_status: orderStatus,
      user_id: user._id || user.userId,
    };
    console.log(payload);
    setLoadingAddOrder(true);
    dispatch(addNewOrder(payload))
      .then(() => {
        history.push("/dashboard/orders");
        setLoadingAddOrder(false);
        dispatch(getOrders(user._id || user.userId));
      })
      .catch(() => {
        setLoadingAddOrder(false);
        alert("semothing went wrong");
      });
  };

  return (
    <div className="add-order-form">
      <Row>
        <Col xs={12} md={9}>
          <div className="add-order-form-wrap">
            <form className="form">
              <div className="order-form-sec">
                <div className="form-sec dropoff dropOff-section">
                  <div className="form-sec-head">Drop off Details</div>
                  <div class={`tab-sec`}>
                    <div class="form-container">
                      <div className="form-sec-content buyer-details">
                        <div className="flex">
                          <div className="form-group">
                            <div className="ip-field-wrp">
                              <label htmlFor="customer_name">Name</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  !formData["customer_name"].valid &&
                                  formData["customer_name"].touched
                                    ? "error"
                                    : ""
                                }`}
                                placeholder="Enter"
                                name="customer_name"
                                value={formData["customer_name"].value}
                                onChange={handleChangeFormField}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="ip-field-wrp">
                              <label htmlFor="customer_mobile">Mobile Number</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  !formData["customer_mobile"].valid &&
                                  formData["customer_mobile"].touched
                                    ? "error"
                                    : ""
                                }`}
                                placeholder="Enter"
                                name="customer_mobile"
                                value={formData["customer_mobile"].value}
                                onChange={handleChangeFormField}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="ip-field-wrp">
                              <label htmlFor="dropoff_address_line">Address line</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  !formData["dropoff_address_line"].valid &&
                                  formData["dropoff_address_line"].touched
                                    ? "error"
                                    : ""
                                }`}
                                placeholder="Enter"
                                name="dropoff_address_line"
                                value={formData["dropoff_address_line"].value}
                                onChange={handleChangeFormField}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <EditStateCityPincode
                            states={states}
                            updateFormPayload={updateAddressFormPayload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-sec dropoff pickUp-section">
                  <div className="form-sec-head">Pickup Details</div>
                  <div class={`tab-sec`}>
                    <div class="form-container">
                      <div className="form-sec-content buyer-details">
                        <div className="flex">
                          <div className="form-group">
                            <div className="ip-field-wrp">
                              <label htmlFor="pickup_address_contact_name">Name</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  !formData["pickup_address_contact_name"].valid &&
                                  formData["pickup_address_contact_name"].touched
                                    ? "error"
                                    : ""
                                }`}
                                placeholder="Enter"
                                name="pickup_address_contact_name"
                                value={formData["pickup_address_contact_name"].value}
                                onChange={handleChangeFormField}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="ip-field-wrp">
                              <label htmlFor="pickup_address_contact_mobile">Mobile Number</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  !formData["pickup_address_contact_mobile"].valid &&
                                  formData["pickup_address_contact_mobile"].touched
                                    ? "error"
                                    : ""
                                }`}
                                placeholder="Enter"
                                name="pickup_address_contact_mobile"
                                value={formData["pickup_address_contact_mobile"].value}
                                onChange={handleChangeFormField}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="ip-field-wrp">
                              <label htmlFor="pickup_address_line">Address line</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  !formData["pickup_address_line"].valid &&
                                  formData["pickup_address_line"].touched
                                    ? "error"
                                    : ""
                                }`}
                                placeholder="Enter"
                                name="pickup_address_line"
                                value={formData["pickup_address_line"].value}
                                onChange={handleChangeFormField}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <EditStateCityPincode
                            states={states}
                            updateFormPayload={updatePickupAddressFormPayload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-sec packageDetails-section">
                  <div className="form-sec-head">Package Details</div>
                  <div class={`tab-sec`}>
                    <div class="form-container">
                      <div className="package-details">
                        <div className="form-sec-content buyer-details">
                          <div className="flex">
                            <div className="form-group">
                              <div className="ip-field-wrp">
                                <label htmlFor="package_weight">Package Weight in KG</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    !formData["package_weight"].valid &&
                                    formData["package_weight"].touched
                                      ? "error"
                                      : ""
                                  }`}
                                  placeholder="Enter"
                                  name="package_weight"
                                  value={formData["package_weight"].value}
                                  onChange={handleChangeFormField}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="select-bar">
                                <label>Material Type</label>
                                <div className="select-group">
                                  <Select
                                    className="select"
                                    value={selectedMaterialType}
                                    onChange={(selected) => {
                                      setSelectedMaterialType(selected);
                                    }}
                                    options={materialList}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="select-bar">
                                <label>Vehicle type</label>
                                <div className="select-group">
                                  <Select
                                    className="select"
                                    value={selectedVehicleType}
                                    onChange={(selected) => {
                                      setSelectedVehicleType(selected);
                                    }}
                                    options={vehicleList}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="ip-field-wrp">
                                <label htmlFor="package_description">Description</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    !formData["package_description"].valid &&
                                    formData["package_description"].touched
                                      ? "error"
                                      : ""
                                  }`}
                                  placeholder="Enter"
                                  name="package_description"
                                  value={formData["package_description"].value}
                                  onChange={handleChangeFormField}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="btn-wrp">
                            <Button
                              className="centered"
                              onClick={() => {
                                handleSubmit();
                              }}
                              type="button"
                            >
                              Add Order
                              {loadingAddOrder && <ButtonSpinner />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="form-sec transportersList-section">
                <div className=" package-form-part">
                  <div className="form-sec-head">
                    Select Transport Partner
                    {tabActiveState.transportersList ? (
                      <TiMinus onClick={() => handleToggle("transportersList")} />
                    ) : (
                      <TiPlus onClick={() => handleToggle("transportersList")} />
                    )}
                  </div>
                  <div class={`tab-sec ${tabActiveState.transportersList ? "active" : ""}`}>
                    <div class="form-container">
                      <TransporterListModal
                        transportorsList={transportorsList}
                        selectedTransporterData={selectedTransporterData}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </form>
          </div>
        </Col>
        <Col className="" xs={12} md={3}>
          <div className="instructions">
            <h6>Instructions</h6>
            <p>
              Start by filling your order details like; Order ID (Generate an Order ID if you don’t
              have one), Order Date (the date on which you have received the order), and Order
              Channel (For e.g; your website, marketplaces, social media, etc).
            </p>
            <p>
              While entering customer details, please make sure you are entering the correct phone
              number and email ID. We will use this information in all future communication with
              your customer. please make sure you are entering the correct phone number and email
              ID.
            </p>
            <p>
              Please enter the product name, quantity and per-unit price. We’ll recommend you to add
              the discounted amount and tax rate if any applicable.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdOrderForm;
