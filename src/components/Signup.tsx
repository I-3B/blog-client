import { ReactElement, useState } from "react";
import { Navigate } from "react-router";
import { BASE_URL } from "..";
import useAuth from "../hooks/useAuth";
import user from "../interfaces/user";
import "../style/form.scss";
import Loading from "./Loading";

function Signup() {
    const [formMessage, setFormMessage] = useState<ReactElement<any, any>>();
    const { login } = useAuth();
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);

    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormMessage(<Loading />);
        const formData: any = new FormData(e.currentTarget);
        const form: user = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };
        const result = await fetch(`${BASE_URL}/auth/signup`, {
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(form),
        }).then((res) => res.json());
        if (result.errors) {
            setFormMessage(
                <ul>
                    {result.errors.map((error: any) => {
                        return (
                            <li key={error.msg} className="error">
                                {error.msg}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            login({ email: form.email, password: form.password }).then(
                (error: string) => {
                    if (error) {
                        return <Navigate to="/login" />;
                    } else {
                        setLoggedIn(true);
                    }
                }
            );
        }
    };
    if (loggedIn) return <Navigate to="/" />;
    return (
        <form className="form" onSubmit={formSubmitted} action="" method="GET">
            <header>Sign up</header>
            <label htmlFor="username">Your username:</label>
            <input
                id="username"
                type="text"
                placeholder="john_smith"
                name="username"
                required
            ></input>
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
            <input type="submit" value="Signup"></input>
        </form>
    );
}
export default Signup;
