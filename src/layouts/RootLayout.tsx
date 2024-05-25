import React from "react";
import { Outlet } from "react-router-dom";

import "./rootLayout.css";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { Rootstate } from "../store/store";
import { useSelector } from "react-redux";

const RootLayout = () => {
  // 모달 활성화 확인
  const active = useSelector((state: Rootstate) => state.modal.active);
  // 일정 확인(불필요)
  const schedule = useSelector((state: Rootstate) => state.schedule);
  console.log(schedule);

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
