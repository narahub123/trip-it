import "./mypage.css";
import { Outlet } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="mypage">
      <Outlet />
    </div>
  );
};

export default MyPage;
