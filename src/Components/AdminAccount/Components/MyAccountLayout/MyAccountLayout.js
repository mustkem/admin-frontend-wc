import React from "react";
import "../../../../Assets/Style/myAccount/myAccount.scss";

import AccountHeader from "../AccountHeader/AccountHeader";
import Sidebar from "../Sidebar/Sidebar";

function MyAccountLayout(props) {
  return (
    <div className="layout">
      <AccountHeader />
      <div className="account-content">
        <Sidebar />
        <div className="account-layout-content">{props.children}</div>
      </div>
    </div>
  );
}

export default MyAccountLayout;
