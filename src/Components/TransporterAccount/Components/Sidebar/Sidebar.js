import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { FiBox, FiHeadphones } from "react-icons/fi";
import { MdAccountBox } from "react-icons/md";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [sidebarHeight, setSidebarHeight] = useState();
  useEffect(() => {
    setSidebarHeight(document.documentElement.scrollHeight);
  }, []);
  return (
    <div style={{ height: `${sidebarHeight}px` }} className="sidebar">
      <ul className="nav-bar">
        <li>
          <NavLink to="/dashboard">
            <AiOutlineHome />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/orders">
            <AiOutlineShoppingCart />
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/billing">
            <FaRegMoneyBillAlt />
            <span>Billing</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/support">
            <FiHeadphones />
            <span>Support</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile">
            <MdAccountBox />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/price-setting">
            <MdAccountBox />
            <span>Price Setting</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
