import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales_Invoice from "./sales invoice/Sales_Invoice";
import SalesInvoiceList from "./salesinvoicelist/SalesInvoiceList";
import { Toaster } from "react-hot-toast";
import UpdateSales from "./updatesales/UpdateSales";
import Detail from "./detail/Detail";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./profile/Profile";
import CustomerList from "./customer_list/CustomerList";
import Customer from "./customer/Customer";
import CustomerUpdate from "./customer_update/CustomerUpdate";
import Protected from "./pro_tected/Protected";
import ChartApex from "./local_data/ChartApex";

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<ChartApex />} />
            <Route path="/salesinvoice" element={<Sales_Invoice />} />
            <Route path="/salesinvoicelist" element={<SalesInvoiceList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateSaleInvoice/:id" element={<UpdateSales />} />
            <Route path="/details/:id" element={<Detail />} />
            <Route path="/customerlist" element={<CustomerList />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customerUpdate/:id" element={<CustomerUpdate />} />
          </Route>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
