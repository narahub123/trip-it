import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <Link to="mypage/profile">프로필</Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
