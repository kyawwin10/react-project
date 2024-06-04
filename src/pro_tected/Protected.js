import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { Outlet } from "react-router";
import Dashboard from "../dashboard/Dashboard";

const Protected = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  <Dashboard />;
  return <Outlet />;
};

export default Protected;
