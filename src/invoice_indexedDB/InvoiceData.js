// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../api/AxiosInstance";

// const InvoiceData = () => {
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

//     const request = indexedDB.open("InvoiceData", 2);

//     request.onerror = function (event) {
//       console.error("An error occurred with IndexedDB:", event);
//     };

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       updateDataBase(db);
//     };

//     request.onupgradeneeded = function (event) {
//       const db = event.target.result;
//       const store = db.createObjectStore("invoice", { keyPath: "id" });
//       store.transaction.oncomplete = function () {
//         updateDataBase(db);
//       };
//     };

//     const updateDataBase = async (db) => {
//       try {
//         const response = await axiosInstance.get(`/api/invoice/list/all`);
//         const customers = response.data.data;

//         const transaction = db.transaction(["invoice"], "readwrite");
//         const customerStore = transaction.objectStore("invoice");

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
//       const transaction = db.transaction(["invoice"], "readonly");
//       const customerStore = transaction.objectStore("invoice");

//       const request = customerStore.getAll();

//       request.onsuccess = function (event) {
//         setData(event.target.result);
//       };

//       request.onerror = function (event) {
//         console.error("Error fetching data from IndexedDB:", event);
//       };
//     };
//   }, []);

//   return <></>;
// };

// export default InvoiceData;

// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../api/AxiosInstance";

// const InvoiceData = () => {
//   const [data, setData] = useState([]);
//   const dbName = "InvoiceData";
//   const storeName = "invoice";

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

//     const request = indexedDB.open(dbName, 2);

//     request.onerror = function (event) {
//       console.error("An error occurred with IndexedDB:", event);
//     };

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       fetchCustomerData(db);
//     };

//     request.onupgradeneeded = function (event) {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains(storeName)) {
//         db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
//       }
//     };

//     const fetchCustomerData = (db) => {
//       const transaction = db.transaction([storeName], "readonly");
//       const store = transaction.objectStore(storeName);
//       const request = store.getAll();

//       request.onsuccess = function (event) {
//         setData(event.target.result);
//       };

//       request.onerror = function (event) {
//         console.log("Error fetching data from IndexedDB:", event);
//       };
//     };

//     const syncData = async (db) => {
//       try {
//         const response = await axiosInstance.get(`/api/invoice/list/all`);
//         const invoices = response.data.data;
//         console.log(invoices);

//         const transaction = db.transaction([storeName], "readwrite");
//         const store = transaction.objectStore(storeName);
//         console.log(store);

//         invoices.forEach((invoice) => {
//           store.put(invoice);
//         });

//         transaction.oncomplete = function () {
//           console.log("All invoices have been added to the store");
//           fetchCustomerData(db);
//         };

//         transaction.onerror = function (event) {
//           console.error("Transaction error:", event);
//         };
//       } catch (error) {
//         console.error("Error fetching invoices from server:", error);
//         fetchCustomerData(db);
//       }
//     };

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       syncData(db);
//     };
//   }, []);

//   const addInvoice = (invoice) => {
//     const request = indexedDB.open(dbName, 2);

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       const transaction = db.transaction([storeName], "readwrite");
//       const store = transaction.objectStore(storeName);

//       store.add(invoice);

//       transaction.oncomplete = function () {
//         console.log("Invoice added");
//       };

//       transaction.onerror = function (event) {
//         console.error("Transaction error:", event);
//       };
//     };
//   };

//   const updateInvoice = (invoice) => {
//     const request = indexedDB.open(dbName, 2);

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       const transaction = db.transaction([storeName], "readwrite");
//       const store = transaction.objectStore(storeName);

//       store.put(invoice);

//       transaction.oncomplete = function () {
//         console.log("Invoice updated");
//       };

//       transaction.onerror = function (event) {
//         console.error("Transaction error:", event);
//       };
//     };
//   };

//   const deleteInvoice = (id) => {
//     const request = indexedDB.open(dbName, 2);

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       const transaction = db.transaction([storeName], "readwrite");
//       const store = transaction.objectStore(storeName);

//       store.delete(id);

//       transaction.oncomplete = function () {
//         console.log("Invoice deleted");
//       };

//       transaction.onerror = function (event) {
//         console.error("Transaction error:", event);
//       };
//     };
//   };

//   return (
//     <div>
//       <ul>
//         {data.map((invoice) => (
//           <li key={invoice.id}>
//             {invoice.name} - {invoice.amount}
//             <button onClick={() => deleteInvoice(invoice.id)}>Delete</button>
//             {/* Add buttons/forms for update and adding invoices */}
//           </li>
//         ))}
//       </ul>
//       {/* Add UI for adding/updating invoices */}
//     </div>
//   );
// };

// export default InvoiceData;
