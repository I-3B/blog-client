import { ReactElement, useState } from "react";
import { Navigate } from "react-router";
import { BASE_URL } from "..";
import "../style/form.scss";
import Loading from "./Loading";
function AdminSignup() {
    const [formMessage, setFormMessage] = useState<ReactElement<any, any>>();
    const [isAdminNow, setIsAdminNow] = useState<Boolean>();
    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormMessage(<Loading />);
        const password: any = new FormData(e.currentTarget).get("password");
        const { passed, msg } = await fetch(`${BASE_URL}/auth/admin`, {
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${String(
                    localStorage.getItem("token")
                )}`,
            },
            method: "POST",
            body: JSON.stringify({ password }),
        })
            .then((res) => res.json())
            .catch(() => {
                return { passed: false, msg: "user is not logged in" };
            });
        if (passed) {
            setIsAdminNow(true);
        } else setFormMessage(<p className="error">{msg}</p>);
    };
    if (isAdminNow) return <Navigate to="/admin" />;
    return (
        <form className="form" action="" onSubmit={formSubmitted}>
            <header>Become an admin</header>
            <label htmlFor="password">Admin password:</label>
            <input
                type="password"
                id="password"
                name="password"
                required
            ></input>
            {formMessage}
            <input type="submit" value="become an admin"></input>
        </form>
    );
}
export default AdminSignup;
