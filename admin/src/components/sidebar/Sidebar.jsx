import React from "react";
import "./Sidebar.css";
// import { assets } from "../../assets/assets";
import order_icon from "../../assets/order_icon.png";
import add_icon from "../../assets/add_icon.png";
import { NavLink } from "react-router-dom";
const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={add_icon} alt="" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default sidebar;
