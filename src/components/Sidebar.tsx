import "./sidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <aside className="sidebar">
      {pathname.includes("/mypage") && (
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
              to="mypage/posts"
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
      )}
      {pathname.includes("/admin") && (
        <ul>
          <li>
            <NavLink
              to="admin/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              유저 목록
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/schedules"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              일정 목록
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/posts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              모집글 목록
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              신고 목록
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
