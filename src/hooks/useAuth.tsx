import React, { useState } from "react";
import { BASE_URL } from "..";
import user from "../interfaces/user";

const authContext = React.createContext<any>(null);
interface Props {
    children: React.ReactNode;
}
function useAuth() {
    let tokenExists: Boolean = false;
    const tokenDateString = localStorage.getItem("token-date");
    const tokenDate = parseInt(tokenDateString ? tokenDateString : "0");
    //check if token is 30 days old
    if ((Date.now() - tokenDate) / (1000 * 60 * 60 * 24) > 29) {
        localStorage.setItem("token", "");
        localStorage.setItem("token-date", "");
        localStorage.setItem("username", "");
    } else {
        const token = localStorage.getItem("token");
        if (token?.length !== 0) tokenExists = true;
    }
    const [authed, setAuthed] = useState<Boolean>(tokenExists);

    return {
        authed,
        login: (form: user) => {
            return new Promise<string>((res) => {
                fetch(`${BASE_URL}/auth/login`, {
                    mode: "cors",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(form),
                })
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            if (result.token) {
                                localStorage.setItem("token", result.token);
                                localStorage.setItem(
                                    "token-date",
                                    JSON.stringify(Date.now())
                                );
                                localStorage.setItem(
                                    "username",
                                    result.username
                                );
                                localStorage.setItem("admin", result.admin);
                                setAuthed(true);
                                res("");
                            } else {
                                setAuthed(false);
                                res(result.msg);
                            }
                        },
                        (error) => {
                            setAuthed(false);
                            res(error.message);
                        }
                    );
            });
        },
        logout: () => {
            localStorage.clear();
            setAuthed(false);
            return;
        },
    };
}
export function AuthProvider({ children }: Props) {
    const auth = useAuth();

    if (React.Children.count(children)) {
        return (
            <authContext.Provider value={auth}>
                {React.Children.map(children, (child) => (
                    <> {child}</>
                ))}
            </authContext.Provider>
        );
    }
    return <authContext.Provider value={auth}></authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}
