import React from "react";
import "./userLayout.css";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Sidebar />
      <main className="user-layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
