// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../api/AxiosInstance";

// const LocalData = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const indexedDB =
//       window.indexedDB ||
//       window.mozIndexedDB ||
//       window.webkitIndexedDB ||
//       window.msIndexedDB ||
//       window.shimIndexedDB;

//     if (!indexedDB) {
//       console.error("IndexedDB is not supported in this browser.");
//       return;
//     }

//     const request = indexedDB.open("MyData", 1);

//     request.onerror = function (event) {
//       console.error("An error occurred with IndexedDB:", event);
//     };

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       updateDataBase(db);
//     };

//     request.onupgradeneeded = function (event) {
//       const db = event.target.result;
//       const store = db.createObjectStore("customer", { keyPath: "id" });
//       store.transaction.oncomplete = function () {
//         updateDataBase(db);
//       };
//     };

//     const updateDataBase = async (db) => {
//       try {
//         const response = await axiosInstance.get(`/api/customer/list/all`);
//         const customers = response.data.data;

//         const transaction = db.transaction(["customer"], "readwrite");
//         const customerStore = transaction.objectStore("customer");

//         customers.forEach((customer) => {
//           customerStore.put(customer);
//         });

//         transaction.oncomplete = function () {
//           console.log("All customers have been added to the store");
//           fetchCustomerData(db);
//         };

//         transaction.onerror = function (event) {
//           console.error("Transaction error:", event);
//         };
//       } catch (error) {
//         console.error("Error fetching customer data:", error);
//         fetchCustomerData(db); // Still attempt to fetch from IndexedDB
//       }
//     };

//     const fetchCustomerData = (db) => {
//       const transaction = db.transaction(["customer"], "readonly");
//       const customerStore = transaction.objectStore("customer");

//       const request = customerStore.getAll();

//       request.onsuccess = function (event) {
//         setData(event.target.result);
//       };

//       request.onerror = function (event) {
//         console.error("Error fetching data from IndexedDB:", event);
//       };
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const localData = localStorage.getItem("data");
//       if (localData) {
//         setData(JSON.parse(localData));
//       } else {
//         try {
//           const response = await axiosInstance.get(`/api/customer/list/all`);
//           const fetchedData = response.data.data;
//           localStorage.setItem("data", JSON.stringify(fetchedData));
//           setData(fetchedData);
//         } catch (error) {
//           console.error("Error fetching data from API:", error);
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   return <></>;
// };

// export default LocalData;
