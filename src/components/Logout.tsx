import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

function Logout() {
    const { logout } = useAuth();
    logout();
    return <Navigate to="/" />;
}
export default Logout;
