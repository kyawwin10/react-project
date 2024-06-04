import { CButton, CFormInput } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import "react-responsive-pagination/themes/minimal.css";
import { Pagination } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import Dashboard from "../dashboard/Dashboard";

const SalesInvoiceList = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [importFile, setImportFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [totalRow, setTotalRow] = useState(0);
  const [sort, setSort] = useState(10);

  useEffect(() => {
    const searchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/invoice/list?search=${search}&page=${page}&sort=${sort}`
        );

        if (response.status === 200) {
          setList(response.data.data);
          setTotalPage(response.data.lastPage); //lastPage is backend field Name
          setTotalRow(response.data.totalItems); //totalItems is backend field Name
          console.log(response);
        } else {
          throw new Error("Request Failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // console.log(searchData);
    searchData();
  }, [search, page, sort]);

  const showClick = async (invoice_id) => {
    navigate(`/details/${invoice_id}`);
  };

  const editClick = async (id) => {
    navigate(`/updateSaleInvoice/${id}`);
  };

  const deleteClick = async (invoice_id) => {
    const deleteData = await axiosInstance.delete(
      `api/invoice/delete/${invoice_id}`
    );
    toast.success(deleteData.data.message);
    window.location.reload();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const uploadClick = async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        `/api/invoice/importcsv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fileChange = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setImportFile(e.target.result);
        };
      } else {
        setTypeError("Please Select only Your Excel File");
        setImportFile(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  const addClick = () => {
    navigate(`/salesinvoice`);
  };

  return (
    <>
      <Dashboard />
      <div className="saleinvoice_list_body">
        <div className="list_header">
          <div className="list_one">
            <p>Sales Invoice List</p>
          </div>

          <div className="list_two">
            <a
              href="https://crudinvoicepostgresql.onrender.com/api/invoice/exportcsv"
              className="btn btn-sm btn-info"
            >
              Export
            </a>
            &nbsp;
            <CButton
              className="btn btn-sm btn-secondary"
              onClick={() => setVisible(true)}
            >
              Import
            </CButton>
            &nbsp;
            <CButton className="btn btn-sm btn-success" onClick={addClick}>
              +Add
            </CButton>
          </div>

          <div className="list_three">
            <CFormInput
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>

        <p style={{ marginLeft: "22px" }}>Total Count : {totalRow}</p>
        <div className="tb_style">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Invoice No.</th>
                <th scope="col">Customer</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Code</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col" colSpan={3}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {list.map((data, index) => (
                <tr key={index}>
                  <td data-cell="No.">{data.custom_id}</td>
                  <td data-cell="Invoice No.">{data.invoice_no}</td>
                  <td data-cell="Customer">{data.customer_name}</td>
                  <td data-cell="Phone">{data.customer_phone}</td>
                  <td data-cell="Email">{data.customer_email}</td>
                  <td data-cell="Address">{data.customer_address}</td>
                  <td data-cell="Code">
                    {data.stock_items.map((item) => item.stock_code)}
                  </td>
                  <td data-cell="Price">
                    {data.stock_items.map((item) => item.stock_price)}
                  </td>
                  <td data-cell="Quantity">
                    {data.stock_items.map((item) => item.stock_quantity)}
                  </td>
                  <td className="button_on">
                    <CButton
                      className="btn btn-sm btn-success"
                      onClick={() => showClick(data.invoice_id)}
                    >
                      Show
                    </CButton>
                    &nbsp;
                    <CButton
                      className="btn btn-sm btn-warning"
                      onClick={() => editClick(data.invoice_id)}
                    >
                      Edit
                    </CButton>
                    &nbsp;
                    <CButton
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteClick(data.invoice_id)}
                    >
                      Delete
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="pagination-body"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value={totalRow}>All</option>
          </select>

          <Pagination className="justify-content-center">
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
            />
            {[...Array(totalPage)].map((_, index) => {
              // Show only a subset of pages around the current page
              const lowerBound = Math.max(page - 2, 1);
              const upperBound = Math.min(page + 2, totalPage);

              // Render ellipsis if necessary
              if (
                (index + 1 < lowerBound && lowerBound > 2) ||
                (index + 1 > upperBound && upperBound < totalPage - 1)
              ) {
                return null; // Render nothing
              }

              // Render page numbers
              if (
                index + 1 === 1 ||
                index + 1 === totalPage ||
                index + 1 === page ||
                (index + 1 >= lowerBound && index + 1 <= upperBound)
              ) {
                return (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              }

              // Render ellipsis
              if (
                (index + 1 === lowerBound - 1 && lowerBound > 2) ||
                (index + 1 === upperBound + 1 && upperBound < totalPage - 1)
              ) {
                return <Pagination.Ellipsis key={`ellipsis-${index}`} />;
              }

              return null; // Render nothing
            })}
            <Pagination.Next
              onClick={() => handlePageChange(Math.min(page + 1, totalPage))}
              disabled={page === totalPage}
            />
            <Pagination.Last onClick={() => handlePageChange(totalPage)} />
          </Pagination>
        </div>
      </div>

      <Dialog
        header="Upload File"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50%", backgroundColor: "gray" }}
      >
        <div style={{ margin: "2%" }}>
          <h4 className="mt-2">Upload & Excel Import</h4>
          <form>
            <CFormInput
              type="file"
              className="form-control mt-2"
              required
              onChange={fileChange}
              id="fileInput"
              accept=".csv,.xlsx"
            ></CFormInput>
            <CButton
              className="btn btn-primary btn-md mt-2"
              onClick={uploadClick}
            >
              Upload
            </CButton>
            {typeError && (
              <div className="alert alert-danger" role="alert">
                {typeError}
              </div>
            )}
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default SalesInvoiceList;
