import React from "react";
import { Outlet } from "react-router-dom";

import "./rootLayout.css";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <Navbar />
      <div className="blank" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
