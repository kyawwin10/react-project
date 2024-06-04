import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import { CButton, CCol, CFormInput, CRow } from "@coreui/react";
import { useParams } from "react-router";
import "primeicons/primeicons.css";
import Dashboard from "../dashboard/Dashboard";
import { Table } from "react-bootstrap";

const Detail = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  console.log(id);

  const totalAmount = () => {
    const total = value.reduce(
      (amount, item) => amount + parseInt(item.amount || 0),
      0
    );
    return total.toLocaleString("en-US", { minimumFractionDigits: 0 });
  };

  useEffect(() => {
    const showData = async () => {
      try {
        const res = await axiosInstance.get(`/api/invoice/edit/${id}`);
        if (res.status == 200) {
          const {
            customer_name,
            customer_phone,
            customer_email,
            customer_address,
            stock_items,
            invoice_id,
            invoice_no,
            invoice_date,
          } = res.data.data;
          setCustomer(customer_name);
          setPhone(customer_phone);
          setEmail(customer_email);
          setAddress(customer_address);
          setInvoiceId(invoice_id);
          setInvoiceNo(invoice_no);
          setInvoiceDate(invoice_date);
          setValue(
            stock_items.map((item) => ({
              stockId: item.stock_id,
              code: item.stock_code,
              description: item.stock_description,
              price: item.stock_price,
              quantity: item.stock_quantity,
              amount: item.stock_price * item.stock_quantity,
              total: item.total_amount,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching detail data: ", error);
      }
    };
    console.log(showData);
    showData();
  }, [id]);

  const printClick = () => {
    window.print();
  };

  return (
    <>
      <Dashboard />
      <div className="print_design mt-2">
        <h4>Sales Invoice Voucher</h4>
        <CButton onClick={printClick} className="btn pi pi-print printme" />
      </div>

      {/* <CButton onClick={printClick}>Print</CButton> */}
      <div className="father">
        <div className="row mt-3">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <p>
              <span>Customer : {customer}</span>
            </p>

            <p>
              <span>Phone : {phone}</span>
            </p>

            <p>
              <span>Email : {email}</span>
            </p>

            <p>
              <span>Address : {address}</span>
            </p>
          </div>
          <div className="col-md-1"></div>

          <div className="col-md-1"></div>
          <div className="col-md-4">
            <p>
              <span>Invoice ID : {invoiceId}</span>
            </p>

            <p>
              <span>Invoice No. : {invoiceNo}</span>
            </p>

            <p>
              <span>Invoice Date : {invoiceDate}</span>
            </p>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>

      <div className="table-center">
        <CRow>
          <CCol>
            <Table
              responsive
              className="table table-bordered border-dark table-striped"
            >
              <thead className="table table-dark">
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {value.map((data, index) => (
                  <tr key={index}>
                    <td data-cell="Code">
                      <span>{data.code}</span>
                    </td>
                    <td data-cell="Description">
                      <span>{data.description}</span>
                    </td>

                    <td data-cell="Price">
                      <span>{data.price}</span>
                    </td>
                    <td data-cell="Quantity">
                      <span>{data.quantity}</span>
                    </td>
                    <td data-cell="Amount">
                      <span>
                        {data.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* <tfoot>
                <tr>
                  <td colSpan={5}></td>
                </tr>
              </tfoot> */}
            </Table>
          </CCol>
        </CRow>
        <div className="text-center total_amount">
          Total Amount : {totalAmount()}
        </div>
      </div>
    </>
  );
};

export default Detail;
