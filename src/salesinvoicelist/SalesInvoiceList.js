import { CButton, CFormInput } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import "react-responsive-pagination/themes/minimal.css";
import { Pagination } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import Dashboard from "../dashboard/Dashboard";
// import Cookies from "js-cookie";

const SalesInvoiceList = () => {
  const navigate = useNavigate();

  // axiosInstance.interceptors.request.use(
  //   (config) => {
  //     const token = Cookies.get("token");

  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //       console.log("config token");
  //     }
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
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
          console.log(response.data.message);
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
    navigate(`/salesinvoicelist`);
    window.location.reload();
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
      console.log(response.data.message);
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

  const plusClick = () => {
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
            <CButton
              className="btn btn-sm btn-success create_add"
              onClick={addClick}
            >
              +Add
            </CButton>
          </div>

          <div className="list_three">
            <CFormInput
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search"
            />
          </div>
        </div>

        <p style={{ marginLeft: "10px" }}>Total Data Count : {totalRow}</p>
        <div className="tb_style">
          <table className="main_border">
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
          <div>
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
          </div>

          <div className="pagi_main">
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
              />
              {/* {[...Array(totalPage)].map((_, index) => {
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
              })} */}

              {[...Array(totalPage)].map((_, index) => {
                const pageNumber = index + 1;
                const lowerBound = Math.max(page - 2, 1);
                const upperBound = Math.min(page + 2, totalPage);

                // Always render the first page, last page, current page, and pages within the bounds
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPage ||
                  pageNumber === page ||
                  (pageNumber >= lowerBound && pageNumber <= upperBound)
                ) {
                  return (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === page}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  );
                }

                // Render ellipsis before lowerBound and after upperBound
                if (
                  (pageNumber === lowerBound - 1 && lowerBound > 2) ||
                  (pageNumber === upperBound + 1 && upperBound < totalPage - 1)
                ) {
                  return <Pagination.Ellipsis key={`ellipsis-${pageNumber}`} />;
                }

                return null; // Render nothing for pages outside the bounds
              })}

              <Pagination.Next
                onClick={() => handlePageChange(Math.min(page + 1, totalPage))}
                disabled={page === totalPage}
              />
              {/* <Pagination.Last onClick={() => handlePageChange(totalPage)} /> */}
              <Pagination.Last onClick={() => handlePageChange(totalPage)} />
            </Pagination>
          </div>
        </div>

        <CButton onClick={plusClick}>
          <i
            className="pi pi-plus create_hide"
            style={{
              position: "fixed",
              fontSize: "13px",
              color: "white",
              fontWeight: "bolder",
              backgroundColor: "blue",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "40px",
              bottom: "1rem",
              right: "0.5rem",
            }}
          ></i>
        </CButton>
      </div>

      <Dialog
        header="Excel Import"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{
          width: "80%",
          backgroundColor: "gray",
          padding: "10px",
          height: "35%",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <div style={{ margin: "2%" }}>
          <form>
            <CFormInput
              type="file"
              className="form-control mt-4"
              required
              onChange={fileChange}
              id="fileInput"
              accept=".csv,.xlsx"
            ></CFormInput>
            <CButton className="btn btn-primary mt-4" onClick={uploadClick}>
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
