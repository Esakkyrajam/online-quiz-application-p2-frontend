// import React from "react";
// import Navbar from "./Navbar"; // adjust path accordingly
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <main className="pt-16">
//         {" "}
//         {/* optional padding to not overlap navbar */}
//         <Outlet />
//       </main>
//     </>
//   );
// };

// export default Layout;
// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* ✅ Always show navbar */}
      <main className="p-4">
        <Outlet /> {/* ✅ Child pages (HomePage, Login, etc.) render here */}
      </main>
    </div>
  );
};

export default Layout;
