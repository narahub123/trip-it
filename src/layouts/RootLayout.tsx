import React from "react";
import { Outlet } from "react-router-dom";

import "./rootLayout.css";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { Rootstate } from "../store/store";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const active = useSelector((state: Rootstate) => state.modal.active);
  return (
    <div className="rootLayout">
      {active && <Modal />}
      <Navbar />
      <div className="blank" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
