import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
