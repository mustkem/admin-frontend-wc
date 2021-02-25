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
          <NavLink to="/dashboard/queries">
            <FiHeadphones />
            <span>Queries</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/products">
            <FiHeadphones />
            <span>Products</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/add-product">
            <FiHeadphones />
            <span>Add Product</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
