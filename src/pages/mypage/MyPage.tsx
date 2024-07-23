import { useEffect } from "react";
import "./mypage.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/mypage`, { withCredentials: true })
      .then()
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          window.alert("서버에 문제가 있습니다. 잠시 후에 다시 이용해주세요");
          return;
        }
        if (err.response.data.code === 2) {
          window.alert("로그인을 해주세요");
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="mypage">
      <Outlet />
    </div>
  );
};

export default MyPage;
