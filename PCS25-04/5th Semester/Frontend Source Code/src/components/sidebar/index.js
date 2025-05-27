import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import "./index.css"; // We'll add some styles for this
import logo from "../../assets/images/logo/BillWisePro_transparent.png";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const [isOpen] = useState(true);

  return (
    <div>
      <div className={`sidenav ${isOpen ? "open" : ""}`}>
        <img src={logo} className={logo} />
        <Link to="/dashboard" className="logoElement">
          <RxDashboard />
          <span>Dashboard</span>
        </Link>
        <Link to="/clients" className="logoElement">
          {" "}
          <IoPersonOutline /> <span>Clients</span>
        </Link>
        <Link to="/product" className="logoElement">
          <MdOutlineInventory2 />
          <span>Inventory</span>
        </Link>
        <Link to="/sales" className="logoElement">
          <FcSalesPerformance /> <span>Sales Order</span>
        </Link>
        <Link to="/purchase" className="logoElement">
          <BiPurchaseTagAlt />
          <span>Purchase Order</span>
        </Link>

        <Link to="/profile" className="logoElement">
          <CgProfile />
          <span>My Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidenav;
