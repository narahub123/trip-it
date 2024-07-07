import DarkMode from "../../components/testUi/DarkMode";
import "./admin.css";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin" data-theme="light">
      <DarkMode />
      <Outlet />
    </div>
  );
};

export default Admin;
