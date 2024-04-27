import React from "react";
// import Navbar from "./navbar/Navbar";
import CombinedNavbar from "./CombinedNavbar";
const Layout = ({ children }) => {
  return (
    <div>
      <CombinedNavbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
