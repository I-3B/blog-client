import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/Header.scss";

function Header() {
    const { authed } = useAuth();
    return (
        <header className="page-header">
            <nav>
                <ul>
                    <li className="li-logo">
                        <Link to="/" className="logo"></Link>
                    </li>
                    {!authed && (
                        <li>
                            <Link to={"/signup"}>Sign up</Link>
                        </li>
                    )}
                    {!authed && (
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                    )}
                    {authed && (
                        <li>
                            <Link to={"/logout"}>Logout</Link>

                            <span>({localStorage.getItem("username")}) </span>
                        </li>
                    )}
                    <li>
                        <Link to={"/about"}>About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;
