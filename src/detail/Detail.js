import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import { CButton } from "@coreui/react";
import { useParams } from "react-router";
import "primeicons/primeicons.css";
import "../detail/detail.css";

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

  // const printClick = () => {
  //   window.print(onpagehide);
  // };

  const printClick = () => {
    const divToHide = document.querySelector(".divToHide");
    divToHide.classList.add("hidden"); // Hide the div
    window.print();
    divToHide.classList.remove("hidden"); // Show the div again after printing
  };

  return (
    <>
      <div className="divToHide">
        <a href="/salesinvoicelist">Sales Invoice List</a>
        <CButton onClick={printClick} className="pi pi-print" />
        <hr />
      </div>

      <div className="print_design mt-2">
        <h5>Thanks for Your Purchase</h5>
      </div>

      {/* <CButton onClick={printClick}>Print</CButton> */}
      <div className="father">
        <div>
          <p>
            <i className="pi pi-user"></i>&nbsp;
            {customer}
          </p>

          <p>
            <i className="pi pi-phone"></i>&nbsp;
            {phone}
          </p>

          <p>
            <i className="pi pi-building-columns"></i>&nbsp;
            {address}
          </p>
        </div>

        <div>
          <p>ID : {invoiceId}</p>

          <p>No. : {invoiceNo}</p>

          <p>Date : {invoiceDate}</p>
        </div>
      </div>
      <p style={{ padding: "0px 15px" }}>
        <i className="pi pi-envelope"></i>&nbsp;
        {email}
      </p>

      <div className="table_lead">
        <table className="tax table-striped">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col" colSpan={5}>
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
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
          <tfoot>
            <tr>
              <td colSpan={5} style={{ textAlign: "left" }}>
                Total : {totalAmount()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Detail;
