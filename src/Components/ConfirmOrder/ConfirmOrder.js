import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyShipToken, verifyUser } from "../../store/actions";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { parse } from "query-string";
import { path } from "ramda";

function ConfirmOrder() {
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  const query = parse(location.search);

  const user = useSelector((state) => {
    return state.user.user;
  });

  /*
1. loged in and same user.
2. loged in and diffrent user.
3. Not logedin.

  */

  useEffect(() => {
    dispatch(verifyShipToken(query.token))
      .then((shipData) => {
        console.log(shipData);
        dispatch(verifyUser())
          .then((userData) => {
            console.log("shipData", shipData);
            console.log("userdata", userData);
            // to conditions //1. we get user data. 2. user type is transporter //

            const userAvailable = path(["data", "user", "userId"], userData);
            const isValid = path(["data", "isValid"], shipData);
            const userType = path(["data", "user", "User_type"], userData);
            const target_user_type = path(["data", "target_user_type"], shipData);
            console.log(userAvailable, isValid, userType, target_user_type);

            if (
              //1.Loged in. same user //
              userAvailable &&
              isValid &&
              userType === target_user_type
            ) {
              history.push(`/dashboard/orders/${shipData.data.order_id}?action=accept-order`);
            } else if (
              //2.loged in. diffrent user.
              userAvailable &&
              isValid &&
              userType !== target_user_type
            ) {
              const targetUrl = `/dashboard/orders/${shipData.data.order_id}?action=accept-order`;
              history.push("/login/?target-url=" + targetUrl);
            } else {
              // 3. Not logedin //
              history.push("/login");
            }
          })
          .catch((error) => {
            //user is not logedin //
            const targetUrl = `/dashboard/orders/${shipData.data.order_id}?action=accept-order`;
            history.push("/login/?target-url=" + targetUrl);
          });
      })
      .catch((item) => {
        // redirect to error page.
      });
  }, []);
  return <div></div>;
}

export default ConfirmOrder;
