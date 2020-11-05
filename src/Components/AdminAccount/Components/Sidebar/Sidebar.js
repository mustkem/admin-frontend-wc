import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";

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
          <NavLink to="/admin">
            <AiOutlineHome />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders">
            <AiOutlineShoppingCart />
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/revenue">
            <FaRegMoneyBillAlt />
            <span>Revenue</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
