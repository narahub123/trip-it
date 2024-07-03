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
              <span className="sidebar-text">프로필 수정</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="mypage/personal"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">개인정보수정</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="mypage/schedules"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">내 일정</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="mypage/posts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">내 모집글</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="mypage/blockedlist/user"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">내 차단 목록</span>
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
              <span className="sidebar-text">유저 목록</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/schedules"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">일정 목록</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/posts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">모집글 목록</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">신고 목록</span>{" "}
              <span className="sidebar-new-reports">4</span>
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
