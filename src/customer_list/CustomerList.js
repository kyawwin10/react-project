import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { axiosInstance } from "../api/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import { Pagination } from "react-bootstrap";
import Dashboard from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import { Dialog } from "primereact/dialog";

const CustomerList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [dataCount, setDataCount] = useState(0);
  const [sort, setSort] = useState(10);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  // const [allUserData, setAllUsersData] = useState([]);
  // const [offline, setOffline] = useState(!navigator.onLine);

  const [visible, setVisible] = useState(false);

  const viewClick = async () => {
    navigate(`/profile`);
  };

  const editClick = async (id) => {
    navigate(`/customerUpdate/${id}`);
  };

  const fetchData = async () => {
    const res = await axiosInstance.get(
      `/api/customer/list?search=${search}&page=${page}&sort=${sort}`
    );
    if (res.status == 200) {
      setList(res.data.data);
      setTotalPage(res.data.lastPage); //lastPage is backend field name
      setDataCount(res.data.totalItems);
    }
  };

  useEffect(() => {
    fetchData();
    // getAllData();
  }, [search, page, sort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const delClick = async (id) => {
    const delData = await axiosInstance.delete(`/api/customer/delete/${id}`);
    toast.success(delData.data.message);
    window.location.reload();
  };

  const plusClick = () => {
    navigate(`/customer`);
  };

  // const dbVersion = 2;
  // const dbName = "Create";

  // useEffect(() => {
  //   // Listen for online/offline status changes
  //   const handleOnline = () => setOffline(false);
  //   const handleOffline = () => setOffline(true);

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  // Fetch initial data
  //   getAllData();
  //   console.log(getAllData);

  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, []);

  // Open IndexedDB and create object store if necessary
  // const openDB = () => {
  //   return new Promise((resolve, reject) => {
  //     const request = indexedDB.open(dbName, dbVersion);

  //     request.onerror = (event) => {
  //       console.error("An error occurred with IndexedDB", event);
  //       reject(event);
  //     };

  //     request.onupgradeneeded = (event) => {
  //       const db = request.result;
  //       if (!db.objectStoreNames.contains("userData")) {
  //         db.createObjectStore("userData", {
  //           keyPath: "id",
  //           autoIncrement: true,
  //         });
  //       }
  //     };

  //     request.onsuccess = () => {
  //       resolve(request.result);
  //     };
  //   });
  // };

  // Save data to IndexedDB
  // const saveDataToIndexedDB = async (data) => {
  //   console.log(data);
  //   const db = await openDB();
  //   const tx = db.transaction("userData", "readwrite");
  //   const store = tx.objectStore("userData");
  //   store.put(data);
  //   return tx.complete;
  // };

  // Retrieve all data from IndexedDB
  // const getAllData = async () => {
  //   const db = await openDB();
  //   const tx = db.transaction("userData", "readonly");
  //   const store = tx.objectStore("userData");
  //   const request = store.getAll();

  //   request.onsuccess = () => {
  //     console.log(request.result);
  //     setAllUsersData(request.result);
  //   };

  //   tx.oncomplete = () => {
  //     db.close();
  //   };
  // };

  // const getDataFunc = () => {
  //   getAllData();
  // };
  // useEffect(() => {
  //   if (!offline) {
  //     getDataFunc();
  //   }
  // }, [offline]);

  const saveClick = async () => {
    Swal.fire({
      title: "Are you Sure want to Customer Create?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    // const customerData = {
    //   id: allUserData.length + 1,
    //   name,
    //   email,
    //   phone,
    //   address,
    //   password,
    //   profile,
    // };

    // if (offline) {
    //   // Save data to IndexedDB for offline use
    //   await saveDataToIndexedDB(customerData);
    //   toast.success("Data saved offline");
    // } else {
    try {
      // Upload data to server
      let formData = new FormData();
      formData.append("customer_name", name);
      formData.append("customer_email", email);
      formData.append("customer_phone", phone);
      formData.append("customer_address", address);
      formData.append("customer_password", password);
      formData.append("file", profile);

      let saveData = await axiosInstance.post(
        `/api/customer/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(saveData.data.message);
      // Clear form inputs
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPassword("");
      setProfile(null);

      // Fetch latest data text
      // getAllData();
    } catch (error) {
      console.error(error);
    }
    // }
  };

  return (
    <>
      <Dashboard />
      <div className="mains_large">
        <div className="customer_header">
          <div className="customer_title">
            <p>Customer List</p>
          </div>

          <div className="add_search">
            <CButton
              className="btn btn-success create_add"
              onClick={() => setVisible(true)}
            >
              +Add
            </CButton>

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

        <p>Total Data Count : {dataCount}</p>
        <div className="table-card">
          <table className="main_border text-center table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Profile</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.length > 0 &&
                list.map((data, index) => (
                  <tr key={index}>
                    <td data-cell="ID" scope="row">
                      {data.custom_id}
                    </td>
                    <td data-cell="Name" scope="row">
                      {data.customer_name}
                    </td>
                    <td data-cell="Email">{data.customer_email}</td>
                    <td data-cell="Phone">{data.customer_phone}</td>
                    <td data-cell="Address">{data.customer_address}</td>
                    <td data-cell="Proifile_Image">
                      <img
                        src={`https://crudinvoicepostgresql.onrender.com${
                          data.profile_image
                            ? data.profile_image
                            : "/uploads/default.png"
                        }`}
                        width={20}
                        height={20}
                        style={{ borderRadius: "50px" }}
                      />
                    </td>

                    <td className="button_off">
                      <span
                        className="pi pi-eye"
                        style={{ fontSize: "1rem" }}
                        onClick={() => viewClick(data.id)}
                      ></span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        className="pi pi-pen-to-square"
                        style={{ fontSize: "1rem" }}
                        onClick={() => editClick(data.id)}
                      ></span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        className="pi pi-trash"
                        style={{ fontSize: "1.1rem" }}
                        onClick={() => delClick(data.id)}
                      ></span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container mt-3">
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
              <option value={dataCount}>All</option>
            </select>
          </div>
          <div className="pagi_main">
            <Pagination className="justify-content-center">
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
              />
              {[...Array(totalPage)].map((_, index) => {
                const lowerBound = Math.max(page - 2, 1);
                const upperBound = Math.min(page + 2, totalPage);

                if (
                  (index + 1 < lowerBound && lowerBound > 2) ||
                  (index + 1 > upperBound && upperBound < totalPage - 1)
                ) {
                  return null;
                }

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

                if (
                  (index + 1 === lowerBound - 1 && lowerBound > 2) ||
                  (index + 1 === upperBound + 1 && upperBound < totalPage - 1)
                ) {
                  return <Pagination.Ellipsis key={`ellipsis-${index}`} />;
                }

                return null;
              })}
              <Pagination.Next
                onClick={() => handlePageChange(Math.min(page + 1, totalPage))}
                disabled={page === totalPage}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPage)}
                disabled={page === totalPage}
              />
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
        className="card"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{
          height: "550px",
          width: "75%",
          backgroundColor: "#f7edf0",
          borderRadius: "15px",
          padding: "10px",
        }}
      >
        <div className="customer_head_profile">
          <div className="cus_pro">
            <p>Customer</p>
          </div>

          <div className="profile_photo">
            <CFormInput
              type="file"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="customer_upd_form">
          <CRow className="mt-4">
            <CCol lg="6">
              <CRow>
                <CCol lg="2">
                  <CFormLabel>Name</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol lg="2">
                  <CFormLabel>Phone</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol lg="2">
                  <CFormLabel>password</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>
            </CCol>

            <CCol lg="6">
              <CRow>
                <CCol lg="2">
                  <CFormLabel>Email</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol lg="2">
                  <CFormLabel>Address</CFormLabel>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>

        <div style={{ marginLeft: "30px" }}>
          {/* {offline ? (
            <CButton
              className="btn btn-success save_buttom"
              onClick={() => {
                if (offline) {
                  const data = {
                    id: allUserData.length + 1,
                    name,
                    email,
                    phone,
                    address,
                    password,
                    profile,
                  };
                  saveDataToIndexedDB(data);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setAddress("");
                  setPassword("");
                  setProfile(null);
                }
              }}
            >
              Save
            </CButton>
          ) : ( */}
          <CButton className="btn btn-success save_buttom" onClick={saveClick}>
            Save
          </CButton>
          {/* )} */}
        </div>
      </Dialog>
    </>
  );
};

export default CustomerList;
