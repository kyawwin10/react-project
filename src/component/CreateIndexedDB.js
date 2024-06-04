// import { CButton } from "@coreui/react";
// import React from "react";

// const CreateIndexedDB = () => {
//   const idb =
//     window.indexedDB ||
//     window.mozIndexedDB ||
//     window.webkitIndexedDB ||
//     window.msIndexedDB ||
//     window.shimIndexedDB;

//   if (!idb) {
//     console.log("This browser doesn't support IndexedDB");
//     return;
//   }
//   console.log(idb);

//   const request = idb.open("Create", 2);

//   request.onerror = (event) => {
//     console.log("An error occurred with IndexedDB");
//     console.log("Error", event);
//   };

//   request.onupgradeneeded = (event) => {
//     console.log(event);
//     const db = request.result;

//     if (!db.objectStoreNames.contains("userData")) {
//       const objectStore = db.createObjectStore("userData", { keyPath: "id" });
//     }
//   };

//   request.onsuccess = () => {
//     console.log("Database opened successfully");
//   };

//   return (
//     <>
//       <div className="row">
//         <div>
//           <CButton className="btn btn-primary">+ADD</CButton>
//         </div>
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Profile</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td>
//               <CButton className="btn btn-warning">Edit</CButton>{" "}
//               <CButton className="btn btn-danger">Delete</CButton>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default CreateIndexedDB;
