import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  // baseURL: "http://192.168.210.144:3001",
  baseURL: "https://crudinvoicepostgresql.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.userId = userId;
      // console.log("config token", config.headers.Authorization);
      // console.log("config token");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
