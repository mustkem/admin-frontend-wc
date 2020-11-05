import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getStates } from "../../../../store/actions";

function Header() {
  const [myAccountDropdownModal, myAccountDropdownModalHandler] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStates());
  }, []);

  return (
    <header className="account-header">
      <div className="left-panel">
        <div className="logo">
          <a href="">SHIPCENT</a>
        </div>
      </div>
      <div className="right-panel">
        <div className="panel-item">
          <a href="">Rate Calculator</a>
        </div>
        <div className="panel-item">
          <a href="">Track your Shipment</a>
        </div>
        {/* <div className="panel-item">
                    <FaRupeeSign />
                    <span className="amount">
                        20
                    </span>
                    <MdKeyboardArrowDown />

                </div>
                <div className="panel-item">
                    <Button>
                        Recharge
                    </Button>
                </div> */}
        <div className="panel-item user-info-dropdown">
          <div
            onClick={() => {
              myAccountDropdownModalHandler(!myAccountDropdownModal);
            }}
            className="user-info-thumb"
          >
            <MdAccountCircle className="profile-logo" />
            <span>{user.name}</span>
            <MdKeyboardArrowDown />
          </div>
          {myAccountDropdownModal && (
            <ul className="dropdown">
              <li>
                <Link to="/account/my-info">My Account</Link>
              </li>

              <li>
                <a href="#">Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
