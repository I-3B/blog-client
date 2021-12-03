import { ReactElement, useState } from "react";
import { Navigate } from "react-router";
import { BASE_URL } from "..";
import "../style/form.scss";
import Loading from "./Loading";
export default function NewPost() {
    const [formMessage, setFormMessage] = useState<ReactElement<any, any>>();
    const [NavigateTo, setNavigateTo] = useState<any>(false);
    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormMessage(<Loading />);
        const formData: any = new FormData(e.currentTarget);
        const form: any = {
            title: formData.get("title"),
            content: formData.get("content"),
            published: formData.get("published") === "true" ? true : false,
        };
        const token = String(localStorage.getItem("token"));
        const result = await fetch(`${BASE_URL}/admin/posts`, {
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .catch(() => {
                return { errors: [{ msg: "Unauthorized" }] };
            });

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
        } else if (form.published) {
            setNavigateTo(<Navigate to={`/posts/${result.post._id}`} />);
        } else {
            setNavigateTo(<Navigate to="/admin/" />);
        }
    };
    if (NavigateTo) return NavigateTo;
    return (
        <form className="form" onSubmit={formSubmitted}>
            <header>New post</header>
            <label htmlFor="title">Post title:</label>
            <input type="text" id="title" name="title" required />
            <label htmlFor="content">Post content:</label>
            <textarea
                id="content"
                name="content"
                cols={30}
                rows={30}
                required
            />
            <label htmlFor="published" className="checkbox-container">
                Publish post
                <input
                    type="checkbox"
                    id="published"
                    name="published"
                    value="true"
                    className="checkbox"
                    defaultChecked
                />
                <span className="checkmark"></span>
            </label>
            {formMessage}
            <input type="submit" value="Create post" />
        </form>
    );
}
