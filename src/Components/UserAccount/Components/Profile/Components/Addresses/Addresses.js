import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { path } from "ramda";

import AddMoreAddress from "./AddMoreAddress/AddMoreAddress";
import { getAddresses, deleteAddress } from "../../../../../../store/actions";

function ManageCoverageArea() {
  const dispatch = useDispatch();

  const states = useSelector((state) => {
    return state.global.states;
  });
  const user = useSelector((state) => {
    return state.user.user;
  });

  const addresses = useSelector((state) => {
    return state.user.addresses;
  });

  useEffect(() => {
    dispatch(getAddresses(user.userId || user._id));
  }, []);

  function handleDeleteAddress(id) {
    dispatch(deleteAddress({ addressId: id, userId: user._id || user.userId }));
  }

  return (
    <div>
      <h6>Addresses</h6>
      <div className="profile-info">
        <AddMoreAddress states={states} user={user} addresses={addresses} />
        <div className="address-list">
          {addresses &&
            addresses.map((item) => {
              return (
                <div className="address-card">
                  <div className="address-bar">
                    {item.is_default && (
                      <span className="highlight">
                        Selected
                        <FaCheckCircle className="icon" />
                      </span>
                    )}
                    <IoMdClose
                      onClick={() => handleDeleteAddress(item._id)}
                      className="icon-close"
                    />
                    <div className="form-sec-content ">
                      <div>
                        <span>
                          {item.address_line}, {path(["city", 0, "city"], item)},
                        </span>
                      </div>
                      <div>
                        <span>
                          {path(["state", 0, "stateName"], item)} , -{" "}
                          <strong>{path(["pincodes", 0, "pincode"], item)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ManageCoverageArea;
