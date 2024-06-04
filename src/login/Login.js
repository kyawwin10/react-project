import { CButton, CFormInput } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import "primeicons/primeicons.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const token = Cookies.get("token");
  console.log(token);
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const keyEnter = (e) => {
    if (e.key == "Enter") {
      loginClick();
      e.preventDefault();
    }
  };

  const loginClick = async () => {
    const loginData = await axiosInstance.post(`/api/auth/login`, {
      email: email,
      password: password,
    });
    Cookies.set("token", loginData.data.data.token, { expires: 1, path: "" });
    Cookies.set("userId", loginData.data.data.userId, { expires: 1, path: "" });
    Cookies.set("name", loginData.data.data.name, { expires: 1, path: "" });
    Cookies.set("profile_image", loginData.data.data.profile_image, {
      expires: 1,
      path: "",
    });

    navigate(`/dashboard`);
    toast.success(loginData.data.message);
    console.log(loginData.data);
  };

  return (
    <>
      <div className="login_respon">
        <form className="form_login">
          <img
            className="image_container mt-4"
            src="/img/p10.png"
            width={160}
            height={100}
          />
          <div style={{ marginTop: "50px" }}>
            <h4
              style={{
                marginLeft: "18px",
                fontWeight: "650",
                marginTop: "20px",
              }}
            >
              Login
            </h4>
            <div style={{ marginLeft: "10px", marginTop: "20px" }}>
              <div className=" mb-2 input_box">
                <span className="icon">
                  <i className="pi pi-at"></i>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={keyEnter}
                  className="input_form"
                  placeholder="Enter Email"
                />
              </div>

              <div className="mb-3 eye_box">
                <span className="icon">
                  <i className="pi pi-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={keyEnter}
                  className="input_pass"
                  placeholder="Enter Password"
                />
                <div
                  className="icon_plus"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i
                    className={`pi ${showPassword ? "pi-eye" : "pi-eye-slash"}`}
                  ></i>
                </div>
              </div>

              <p style={{ float: "right", marginRight: "17px", color: "blue" }}>
                Forgot Password?
              </p>

              <CButton
                className="btn btn-primary mt-3 buttom_des"
                onClick={loginClick}
                onKeyDown={keyEnter}
              >
                Login
              </CButton>

              <div className="or_head mt-3">
                <div className="or_des"></div>

                <div className="or_style">OR</div>
                <div className="or_des"></div>
              </div>

              <CButton className="btn btn-sm btn-light buttom_design">
                <img
                  src="/img/p8.jpg"
                  width={30}
                  height={32}
                  className="img_design"
                />
                <h6
                  style={{
                    color: "rgb(161, 149, 149)",
                    fontWeight: "650",
                    paddingTop: "8px",
                    marginRight: "15px",
                  }}
                >
                  Login With Google
                </h6>
              </CButton>
            </div>

            <p className="register_des">
              New to Logistics
              <a href="/" style={{ marginLeft: "10px" }}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
