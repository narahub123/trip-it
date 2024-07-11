import { useEffect } from "react";
import DarkMode from "../../components/testUi/DarkMode";
import "./admin.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/admin`, { withCredentials: true })
      .then()
      .catch((err) => {
        if (err.response.data.code === "logout") {
          window.alert("로그인을 해주세요");
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="admin" data-theme="light">
      <DarkMode />
      <Outlet />
    </div>
  );
};

export default Admin;
