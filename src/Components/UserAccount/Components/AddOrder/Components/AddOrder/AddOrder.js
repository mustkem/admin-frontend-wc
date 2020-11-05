import React from "react";
import { useSelector } from "react-redux";

import AddOrderForm from "../AddOrderForm/AddOrderForm";

function UserAccount() {
  const user = useSelector((state) => {
    return state.user.user;
  });

  const states = useSelector((state) => {
    return state.global.states;
  });

  const addresses = useSelector((state) => {
    return state.user.addresses;
  });
  return (
    <div className="order-form-content">
      <AddOrderForm user={user} addresses={addresses} states={states} />
    </div>
  );
}

export default UserAccount;
