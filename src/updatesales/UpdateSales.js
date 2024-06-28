import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { axiosInstance } from "../api/AxiosInstance";
import { useNavigate, useParams } from "react-router";
import Dashboard from "../dashboard/Dashboard";

const UpdateSales = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [code, setCode] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/api/invoice/edit/${id}`);
      if (res.status == 200) {
        const {
          invoice_id,
          invoice_no,
          customer_name,
          customer_phone,
          customer_email,
          customer_address,
          stock_items,
        } = res.data.data;
        setInvoiceId(invoice_id);
        setInvoiceNo(invoice_no);
        setCustomer(customer_name);
        setPhone(customer_phone);
        setEmail(customer_email);
        setAddress(customer_address);
        setValue(
          stock_items.map((item) => ({
            stockId: item.stock_id,
            code: item.stock_code,
            description: item.stock_description,
            price: item.stock_price,
            quantity: item.stock_quantity,
            amount: item.stock_price * item.stock_quantity,
          }))
        );
        console.log(res.data.data);
      }
    };
    console.log(fetchData);
    fetchData();
  }, [id]);

  const updateClick = async () => {
    const stockItems = value.map((item) => ({
      stock_id: item.stockId,
      stock_code: item.code,
      stock_description: item.description,
      stock_price: item.price,
      stock_quantity: item.quantity,
    }));

    // console.log(stockItems);

    let updateData = await axiosInstance.put(`/api/invoice/edit/${invoiceId}`, {
      invoice_id: invoiceId,
      invoice_no: invoiceNo,
      customer_name: customer,
      customer_phone: phone,
      customer_email: email,
      customer_address: address,
      stock_data: stockItems,
      total_amount: totalAmount(),
    });
    toast.success(updateData.data.message);
    navigate(`/salesinvoicelist`);
    console.log(updateData);
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

  const xClick = (stockId) => {
    setValue((prev) => {
      let newData = prev.filter((data) => data.stockId !== stockId);
      console.log(newData);
      return newData;
    });
  };

  return (
    <>
      <Dashboard />
      <h5 className="sales_form_header">Sales Invoice Update</h5>
      <div className="mb-2">
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

              <CRow className="mt-4 mb-3">
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
              <CRow>
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
        <h5>Stock List</h5>
        <CButton className="btn btn-success" onClick={addClick}>
          +Add
        </CButton>
      </div>

      <div className="table_update">
        <CRow className="mt-2">
          <CCol>
            <table className="main_border">
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
                          type="code"
                          className="input_form_style"
                          value={data.code}
                          onChange={(e) => addChange(i, e)}
                          name="code"
                        />
                      </td>
                      <td data-cell="Description">
                        <input
                          form="control"
                          type="text"
                          className="input_form_style"
                          value={data.description}
                          onChange={(e) => addChange(i, e)}
                          name="description"
                        />
                      </td>
                      <td data-cell="Price">
                        <input
                          type="price"
                          className="input_form_style price"
                          value={data.price}
                          onChange={(e) => addChange(i, e)}
                          name="price"
                        />
                      </td>
                      <td data-cell="Quantity">
                        <input
                          type="quantity"
                          className="input_form_style quantity"
                          value={data.quantity}
                          onChange={(e) => addChange(i, e)}
                          name="quantity"
                        />
                      </td>
                      <td data-cell="Amount" className="amount">
                        <span>
                          {data.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </td>
                      <td className="button_x">
                        <CButton
                          className="btn btn-sm btn-danger"
                          onClick={() => xClick(data.stockId)}
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
        <div className="total mt-2">Total Amount : {totalAmount()}</div>

        <CButton className="btn btn-info save_buttom" onClick={updateClick}>
          Update
        </CButton>
      </div>
    </>
  );
};

export default UpdateSales;
