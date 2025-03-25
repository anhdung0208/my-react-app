import { useLocation } from "react-router-dom";
import Sidebar from "../../features/adminManagement/components/common/Sidebar";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/overview") ||
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/users") ||
    location.pathname.startsWith("/sales") ||
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/analytics") ||
    location.pathname.startsWith("/settings");

  return (
    <div
      className="d-flex h-100"
      style={{ backgroundColor: "#1F2A44", minHeight: "100vh" }}
    >
      {isAdminRoute && <Sidebar />}
      <div className="flex-1 overflow-auto" style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
