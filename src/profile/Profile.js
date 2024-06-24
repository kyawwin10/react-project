import { CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import Dashboard from "../dashboard/Dashboard";
import Cookies from "js-cookie";

const Profile = () => {
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState();

  const profile_image = Cookies.get("profile_image");

  useEffect(() => {
    const profileData = async () => {
      const res = await axiosInstance.get(`/api/auth/profile`);
      if (res.status == 200) {
        const {
          customer_name,
          customer_email,
          customer_phone,
          customer_address,
          profile_image,
        } = res.data.data;
        setCustomer(customer_name);
        setEmail(customer_email);
        setPhone(customer_phone);
        setAddress(customer_address);
        setProfile(profile_image);
        console.log(res.data.data);
      }
    };
    console.log(profileData);
    profileData();
  }, []);

  return (
    <>
      <Dashboard />

      <div className="card-body" style={{ padding: "25px" }}>
        <div className="style">
          <h4 style={{ textAlign: "center" }} className="mb-2 mt-5">
            Profile Page&nbsp;&nbsp;
            <img
              src={`https://crudinvoicepostgresql.onrender.com${profile_image}`}
              width={75}
              height={60}
              style={{ borderRadius: "60px" }}
            />
          </h4>

          <CRow className="mb-5">
            <CCol lg="2"></CCol>
            <CCol lg="8">
              <CRow>
                <CCol lg="2">
                  <CFormLabel>Customer : </CFormLabel>
                </CCol>
                <CCol lg="10">
                  <CFormInput
                    className="form-control"
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    disabled
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol lg="2">
                  <CFormLabel>Email : </CFormLabel>
                </CCol>
                <CCol lg="10">
                  <CFormInput
                    className="form-control"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol lg="2">
                  <CFormLabel>Phone : </CFormLabel>
                </CCol>
                <CCol lg="10">
                  <CFormInput
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol lg="2">
                  <CFormLabel>Address : </CFormLabel>
                </CCol>
                <CCol lg="10">
                  <CFormInput
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled
                  />
                </CCol>
              </CRow>
            </CCol>
            <CCol lg="2"></CCol>
          </CRow>
        </div>
      </div>
    </>
  );
};

export default Profile;
