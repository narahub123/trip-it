import React from "react";
import "./userLayout.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="userLayout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
