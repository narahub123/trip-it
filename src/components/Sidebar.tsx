import { useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import "./sidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
  const { pathname } = useLocation();
  const reports = useSelector((state: Rootstate) => state.return.reports);
  const unsolved = reports.filter((report) => report.reportFalse === 0).length;
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
              <span className="sidebar-text">개인정보</span>
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
              to="admin/blocks"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">차단 목록</span>{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">신고 목록</span>{" "}
              <span className="sidebar-new-reports">{unsolved}</span>
            </NavLink>
          </li>
          {/* 테스트 용 */}
          <li>
            <NavLink
              to="admin/reports/test"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="sidebar-text">신고 하기(연습)</span>{" "}
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
