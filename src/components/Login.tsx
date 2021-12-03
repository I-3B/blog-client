import { ReactElement, useState } from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import user from "../interfaces/user";
import "../style/form.scss";
import Loading from "./Loading";

function Login() {
    const [formMessage, setFormMessage] = useState<ReactElement<any, any>>();
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    const { login } = useAuth();
    const formSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
        setFormMessage(<Loading />);
        e.preventDefault();
        const formData: any = new FormData(e.currentTarget);
        const form: user = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        login(form).then((error: string) => {
            if (error) {
                setFormMessage(<p className="error">{error}</p>);
            } else {
                setLoggedIn(true);
            }
        });
    };
    if (loggedIn) return <Navigate to="/" />;
    return (
        <form className="form" onSubmit={formSubmitted} action="" method="GET">
            <header>Login</header>
            <label htmlFor="email">Your email:</label>
            <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                name="email"
                required
            ></input>
            <label htmlFor="password">Your password:</label>
            <input
                id="password"
                type="password"
                name="password"
                required
            ></input>
            {formMessage}

            <input type="submit" value="login"></input>
        </form>
    );
}
export default Login;
