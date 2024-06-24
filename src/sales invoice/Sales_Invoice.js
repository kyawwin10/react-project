import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'react-date-picker/dist/DatePicker.css';
// import DatePicker from "react-date-picker";
import { axiosInstance } from "../api/AxiosInstance";
import Dashboard from "../dashboard/Dashboard";
import { Table } from "react-bootstrap";

const Sales_Invoice = () => {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState([]);
  const [code, setCode] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState([]);
  //   const [showAddInputs, setShowAddInputs] = useState(false);

  const totalAmount = () => {
    const total = value.reduce(
      (amount, item) => amount + parseInt(item.amount || 0),
      0
    );
    return total.toLocaleString("en-US", { minimumFractionDigits: 0 });
  };

  const customerChange = (e) => {
    setCustomer(e.target.value);
  };

  const phoneChange = (e) => {
    setPhone(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const addressChange = (e) => {
    setAddress(e.target.value);
  };

  const addClick = () => {
    setValue((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        code: "",
        description: "",
        price: "",
        quantity: "",
        amount: "",
      },
    ]);
    // setShowAddInputs(true)
  };

  const addChange = (i, e) => {
    const { name, value } = e.target;

    switch (name) {
      case "code":
        setCode(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "total":
        setTotal(value);
        break;
    }

    console.log(e.target);
    setValue((prev) => {
      const updatedValue = prev.map((item, index) => {
        if (index === i) {
          let amount = 0;
          let price = 0;
          let quantity = 0;
          if (item.quantity && item.price) {
            amount = item.quantity * item.price;
          }

          if (name == "price") {
            amount = item.quantity * value;
          }
          if (name == "quantity") {
            amount = item.price * value;
          }

          return { ...item, [name]: value, amount: amount };
        }
        return item;
      });
      return updatedValue;
    });
  };

  const xClick = (id) => {
    setValue((prev) => {
      let newData = prev.filter((data) => data.id != id);
      return newData;
    });
  };

  const saveClick = async () => {
    const stockItems = value.map((item) => ({
      stock_code: item.code,
      stock_description: item.description,
      stock_price: item.price,
      stock_quantity: item.quantity,
    }));

    let saveData = await axiosInstance.post("/api/invoice/create", {
      customer_name: customer,
      customer_phone: phone,
      customer_email: email,
      customer_address: address,
      stock_data: stockItems,
      total_amount: totalAmount(),
    });

    toast.success(saveData.data.message);
    console.log(saveData);
    setCustomer("");
    setPhone("");
    setEmail("");
    setAddress("");
    // setShowAddInputs(false)
  };

  return (
    <>
      <div>
        <Dashboard />
        <h5 className="sales_form_header">Sales Invoice</h5>

        <div id="sales_form_body">
          <CRow>
            <CCol lg="6">
              <CRow>
                <CCol lg="2">
                  <CFormLabel>Customer</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    className="form-control"
                    type="text"
                    value={customer}
                    onChange={customerChange}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol lg="2">
                  <CFormLabel className="col-form-label">Email</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    className="form-control"
                    type="text"
                    value={email}
                    onChange={emailChange}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>
            </CCol>

            <CCol lg="6">
              <CRow style={{ marginRight: "50%" }}>
                <CCol lg="2">
                  <CFormLabel>Phone</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    className="form-control"
                    type="number"
                    value={phone}
                    onChange={phoneChange}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol lg="2">
                  <CFormLabel className="col-form-label">Address</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={addressChange}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>
      </div>

      <div className="stock_home">
        <h2>Stock List</h2>
        <CButton className="btn btn-success" onClick={addClick}>
          +Add
        </CButton>
      </div>

      {/* {showAddInputs ? <> */}
      <div className="card-body table_style">
        <CRow>
          <CCol>
            <table className="main_border table-striped">
              <thead className="table table-info">
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {value.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td data-cell="Code">
                        <input
                          type="text"
                          className="input_form_style"
                          value={data.code}
                          onChange={(e) => addChange(i, e)}
                          name="code"
                        />
                      </td>

                      <td data-cell="Description">
                        <input
                          type="text"
                          className="input_form_style"
                          value={data.description}
                          onChange={(e) => addChange(i, e)}
                          name="description"
                        />
                      </td>

                      <td data-cell="Price">
                        <input
                          type="number"
                          className="input_form_style price"
                          value={data.price.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                          })}
                          onChange={(e) => addChange(i, e)}
                          name="price"
                        />
                      </td>

                      <td data-cell="Quantity">
                        <input
                          type="number"
                          className="input_form_style quantity"
                          value={data.quantity}
                          onChange={(e) => addChange(i, e)}
                          name="quantity"
                        />
                      </td>

                      <td data-cell="Amount">
                        <span className="amount">
                          {data.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </td>
                      <td className="button_x">
                        <CButton
                          className="btn btn-danger"
                          onClick={() => xClick(data.id)}
                        >
                          X
                        </CButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCol>
        </CRow>
        <div className="total_amt">Total Amount : {totalAmount()}</div>

        <CButton className="btn btn-success save_buttom" onClick={saveClick}>
          Save
        </CButton>
      </div>

      {/* </>: <StockList />} */}
    </>
  );
};

export default Sales_Invoice;
