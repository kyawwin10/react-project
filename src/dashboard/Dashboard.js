import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import "primeicons/primeicons.css";
import { CButton } from "@coreui/react";
import "react-bootstrap-icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const profile_image = Cookies.get("profile_image");
  const name = Cookies.get("name");

  // const navLinkStyle = ({ isActive }) => {
  //   return {
  //     color: isActive ? "yellow" : "white",
  //     fontWeight: isActive ? "bold" : "normal",
  //     textDecoration: isActive ? "none" : "none",
  //   };
  // };

  function logoutClick() {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("name");
    Cookies.remove("profile_image");
    navigate("/login");
  }

  return (
    <header>
      <nav ref={navRef}>
        <a href="/home">
          <i className="pi pi-home icon_item" />
          Home
        </a>
        <a href="/salesinvoicelist">
          <i className="pi pi-chart-bar icon_item"></i>
          Sales Invoice
        </a>
        <a href="/customerlist">
          <i className="pi pi-user icon_item"></i>Customer
        </a>
        <a href="/customerlist">
          <i className="pi pi-info-circle icon_item"></i>About Us
        </a>
        <a href="/customerlist">
          <i className="pi pi-calendar-clock icon_item"></i>Plans
        </a>
        <a href="/customerlist">
          <i className="pi pi-envelope icon_item"></i>Message
        </a>
        <a href="/customerlist">
          <i className="pi pi-wallet icon_item"></i>Payment
        </a>
        <a href="/customerlist">
          <i className="pi pi-calendar-plus icon_item"></i>Schedule
        </a>
        <a href="/customerlist">
          <i className="pi pi-cart-plus icon_item"></i>My Cart
        </a>
        <a href="/customerlist">
          <i className="pi pi-percentage icon_item"></i>Promotion
        </a>
        <a href="/customerlist">
          <i className="pi pi-headphones icon_item"></i>Support
        </a>
        <a href="/customerlist">
          <i className="pi pi-cog icon_item"></i>Setting
        </a>

        <div className="logout_icon">
          <i className="pi pi-sign-out icon_item"></i>
          <CButton
            className="btn btn-primary"
            style={{ color: "white" }}
            onClick={logoutClick}
          >
            Logout
          </CButton>
        </div>

        <img src="img/p12.jpg" className="img_hide" />
        <img
          src={`https://crudinvoicepostgresql.onrender.com${profile_image}`}
          className="image_hide"
          style={{ marginLeft: "10px" }}
        />

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <i
            className="pi pi-times"
            style={{
              fontSize: "13px",
              color: "black",
              backgroundColor: "#fff",
              width: "30px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
              borderRadius: "40px",
            }}
          ></i>
        </button>
        <p className="jonathan">{name}</p>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <i className="pi pi-bars"></i>
      </button>
      {window.location.pathname === "/customerlist" && (
        <p className="cus_list">Customer List</p>
      )}
      {window.location.pathname === "/salesinvoicelist" && (
        <p className="inv_list">Sales Invoice List</p>
      )}
      {/* {window.location.pathname === "/customerUpdate/:id" && (
        <p className="cus_upd">Customer Update</p>
      )} */}
      {window.location.pathname === "/customer" && (
        <p className="cus_cre">Customer</p>
      )}
      {window.location.pathname === "/salesinvoice" && (
        <p className="inv_cre">Sales Invoice</p>
      )}
      <img src="img/p7.jpg" className="image_logo" />
    </header>
    // {/* <div ref={navRef} className="dashboard_nav">
    //   <NavLink style={navLinkStyle} to="/home">
    //   Home
    //   </NavLink>

    //   <NavLink style={navLinkStyle} to="/salesinvoicelist">
    //     Sales&nbsp;Invoice
    //   </NavLink>

    //   <NavLink style={navLinkStyle} to="/customerlist">
    //     Customer
    //   </NavLink>

    //   <CButton className="btn btn primary" onClick={logoutClick}>
    //     Logout
    //   </CButton>
    // </div> */}
  );
};

export default Dashboard;
