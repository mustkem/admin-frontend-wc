import React from "react";
import { useSelector } from "react-redux";
import UserAccount from "../../UserAccount";

function Index() {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const userType = user && user.User_type;
  return (
    <>
      <UserAccount />
    </>
  );
}

export default Index;
