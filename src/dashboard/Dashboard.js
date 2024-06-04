import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "primeicons/primeicons.css";
// import LocalData from "../local_data/LocalData";
// import InvoiceData from "../invoice_indexedDB/InvoiceData";

const Dashboard = () => {
  const navigate = useNavigate();

  const profile_image = Cookies.get("profile_image");

  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "yellow" : "white",
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "none",
    };
  };

  function logoutClick() {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("name");
    Cookies.remove("profile_image");
    navigate("/login");
  }

  return (
    <>
      {/* <LocalData /> */}
      {/* <InvoiceData /> */}

      <div className="mother">
        <div className="dashboard_design">
          <div className="logocontainer">
            <img src="img/p7.jpg" className="logo" />
          </div>

          <div className="dashboard_nav" style={{ marginRight: "90px" }}>
            <div className="nav_home">
              <NavLink style={navLinkStyle} to="/home">
                Home
              </NavLink>
            </div>

            <div className="nav_sales">
              <NavLink style={navLinkStyle} to="/salesinvoicelist">
                Sales&nbsp;Invoice
              </NavLink>
            </div>

            <div className="nav_customer">
              <NavLink style={navLinkStyle} to="/customerlist">
                Customer
              </NavLink>
              {/* <CButton className="nav-btn nav-close-btn">
                <i className="pi pi-times"></i>
              </CButton> */}
            </div>

            {/* <CButton className="nav-btn">
              <i className="pi pi-bars"></i>
            </CButton> */}
          </div>

          <div className="dashboard_dropdown">
            <Dropdown style={{ marginRight: "10px" }}>
              <Dropdown.Toggle>
                <img
                  src={`https://crudinvoicepostgresql.onrender.com${profile_image}`}
                  width={20}
                  height={20}
                  style={{ borderRadius: "25px" }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={logoutClick}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
