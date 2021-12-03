import { ReactElement, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { BASE_URL } from "..";
import post from "../interfaces/post";
import "../style/form.scss";
import Loading from "./Loading";
export default function EditPost() {
    const { postId } = useParams();
    const [postData, setPostData] = useState<post>();
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
        const result = await fetch(`${BASE_URL}/admin/posts/${postId}/`, {
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: "PUT",
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
    useEffect(() => {
        const token = String(localStorage.getItem("token"));
        fetch(`${BASE_URL}/admin/posts/${postId}`, {
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .catch(() => {
                return { errors: [{ msg: "Unauthorized" }] };
            })
            .then((res) => {
                setPostData(res);
            });
    }, []);
    if (NavigateTo) return NavigateTo;
    if (!postData) return <Loading />;
    return (
        <form className="form" onSubmit={formSubmitted}>
            <header>Edit post</header>
            <label htmlFor="title">Post title:</label>
            <input
                type="text"
                id="title"
                name="title"
                defaultValue={postData.title}
                required
            />
            <label htmlFor="content">Post content:</label>
            <textarea
                id="content"
                name="content"
                cols={30}
                rows={30}
                defaultValue={postData.content}
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
                    defaultChecked={postData.published}
                />
                <span className="checkmark"></span>
            </label>
            {formMessage}
            <input type="submit" value="Create post" />
        </form>
    );
}
