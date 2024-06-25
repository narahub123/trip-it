import "./sidebar.css";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink
            to="mypage/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            프로필 수정
          </NavLink>
        </li>
        <li>
          <NavLink
            to="mypage/personal"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            개인정보수정
          </NavLink>
        </li>
        <li>
          <NavLink
            to="mypage/schedules"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            내 일정
          </NavLink>
        </li>
        <li>
          <NavLink
            to="mypage/details"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            내 모집글
          </NavLink>
        </li>
        <li>
          <NavLink
            to="mypage/bans"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            내 차단 멤버
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
