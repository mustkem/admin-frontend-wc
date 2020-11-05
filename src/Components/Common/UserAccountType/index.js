import React from "react";
import { useSelector } from "react-redux";
import UserAccount from "../../UserAccount";
import TransporterAccount from "../../TransporterAccount";

function Index() {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const userType = user && user.User_type;
  return (
    <>
      {userType === "normal_user" && <UserAccount />}
      {userType === "transporter_user" && <TransporterAccount />}
    </>
  );
}

export default Index;
