import "./sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="mypage/profile">프로필</Link>
        </li>
        <li>
          <Link to="mypage/personal">개인정보수정</Link>
        </li>
        <li>
          <Link to="mypage/mySchedules">내 일정</Link>
        </li>
        <li>
          <Link to="mypage/myDetails">내 모집글</Link>
        </li>
        <li>
          <Link to="mypage/myBans">내 모집글</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
