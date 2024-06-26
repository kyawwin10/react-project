import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import { useNavigate, useParams } from "react-router";
import Dashboard from "../dashboard/Dashboard";
import toast from "react-hot-toast";

const CustomerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState();

  useEffect(() => {
    let updateData = async () => {
      const res = await axiosInstance.get(`/api/customer/edit/${id}`);
      if (res.status == 200) {
        const {
          customer_name,
          customer_email,
          customer_phone,
          customer_address,
          profile_image,
        } = res.data.data;
        setName(customer_name);
        setEmail(customer_email);
        setPhone(customer_phone);
        setAddress(customer_address);
        setProfile(
          profile_image
            ? "https://crudinvoicepostgresql.onrender.com" + profile_image
            : "img/p7.jpg"
        );
      }
    };
    console.log(updateData);
    updateData();
  }, [id]);

  const updateClick = async () => {
    let formData = new FormData();
    formData.append("edit_customer_name", name);
    formData.append("edit_customer_email", email);
    formData.append("edit_customer_phone", phone);
    formData.append("edit_customer_address", address);
    formData.append("file", profile);
    try {
      const response = await axiosInstance.put(
        `/api/customer/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate(`/salesinvoicelist`);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setProfile("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dashboard />

      <div className="update_head">
        <p>Customer Update</p>
      </div>

      <div className="upload">
        <img src={profile} style={{ width: "90px", height: "90px" }} />
        <div className="round">
          <input
            type="file"
            className="file_upload"
            onChange={(e) => {
              const file = e.target.files[0];
              setProfile(URL.createObjectURL(file));
            }}
          />

          <i className="pi pi-camera"></i>
        </div>
      </div>

      {/* <div className="fileupload">
          <input
            type="file"
            id="actual-btn"
            hidden
            onChange={(e) => setProfile(e.target.files[0])}
          />
          <label htmlFor="actual-btn" className="btn btn-info upload_button">
            Upload
          </label>
          {profile && <p>{profile.name}</p>}
        </div> */}

      {/* <div className="fileupload">
          <input type="file" id="actual-btn" hidden />

          <label className="upload_button">Upload File</label>
        </div> */}

      {/* <div className="head_profile">
        
      </div> */}

      <div className="card-body customer_upd_form mt-4">
        <CRow className="mt-2">
          <CCol lg="6">
            <CRow className="mt-3">
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
          </CCol>
          <CCol lg="6">
            <CRow className="mt-3">
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

      <div style={{ marginLeft: "40px" }}>
        <CButton className="btn btn-info save_buttom" onClick={updateClick}>
          Update
        </CButton>
      </div>
    </>
  );
};

export default CustomerUpdate;
