import { Navigate, Outlet } from "react-router";

function RequireAdmin() {
    if (localStorage.getItem("admin") === "true") {
        return <Outlet />;
    } else return <Navigate to="/login" />;
}
export default RequireAdmin;
