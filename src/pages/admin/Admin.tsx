import "./admin.css";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
      <Outlet />
    </div>
  );
};

export default Admin;
