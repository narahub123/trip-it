import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { isAction } from "@reduxjs/toolkit";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <NavLink to="/">
          <img src="/images/trip-it-logo.png" alt="로고" />
        </NavLink>
      </div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink to="/community">Community</NavLink>
        <NavLink to="/mypage">MyPage</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/login">log in</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
