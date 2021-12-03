import { useState } from "react";
import { BASE_URL } from "..";
import post from "../interfaces/post";
import "../style/PostCardAdmin.scss";
function PostCardAdmin(props: { post: post }) {
    const [removePost, setRemovePost] = useState(false);
    const deletePost = async (e: any) => {
        const postId = e.target.parentNode.id;
        const token = String(localStorage.getItem("token"));
        const result = await fetch(`${BASE_URL}/admin/posts/${postId}/`, {
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            method: "DELETE",
        })
            .then((res) => res.json())
            .catch(() => {
                return { error: "Unauthorized" };
            });
        if (result.error) {
            alert(result.error);
        } else {
            setRemovePost(true);
        }
    };
    if (removePost) return <></>;
    return (
        <div className="post-card-admin" id={props.post._id}>
            <h3>{props.post.title}</h3>
            {props.post.published && (
                <a className="view" href={`/posts/${props.post._id}`}>
                    User view
                </a>
            )}
            <a className="edit" href={`/admin/posts/${props.post._id}/edit`}>
                Edit post
            </a>
            <button className="delete" onClick={deletePost}>
                Delete post
            </button>

            <span className="date">
                {new Date(props.post.publishedAt)
                    .toISOString()
                    .replace(/T/, " ")
                    .replace(/\..+/, "")}
            </span>
        </div>
    );
}
export default PostCardAdmin;
