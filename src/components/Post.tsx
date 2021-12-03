import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../index";
import comment from "../interfaces/comment";
import post from "../interfaces/post";
import "../style/Post.scss";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

function Post() {
    const { authed, logout } = useAuth();
    const { postId } = useParams();
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState<post>();
    const [comments, setComments] = useState<any>(<Loading />);
    const [newComment, setNewComment] = useState<Boolean>();
    const [commentFormErrors, setCommentFormErrors] = useState(<></>);
    const commentSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: any = new FormData(e.currentTarget);
        const token: string = String(localStorage.getItem("token"));
        const user = await fetch(`${BASE_URL}/user`, {
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .catch(() => null);
        if (user) {
            const comment = {
                content: String(formData.get("comment")),
            };
            const result = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
                mode: "cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify(comment),
            })
                .then((res) => res.json())
                .catch((error) => error);
            if (result.comment) {
                setNewComment((bool) => !bool);
            } else if (result.errors) {
                setCommentFormErrors(
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
            }
        } else {
            logout();
            alert("user data is invalid login again");
        }
    };
    useEffect(() => {
        fetch(`${BASE_URL}/posts/${postId}`, {
            mode: "cors",
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.msg) {
                        throw new Error("Error: 404 Page not Found");
                    }
                    setIsLoaded(true);
                    setPost(result);
                },
                (error) => {
                    setIsLoaded(false);
                    setError(error);
                }
            )
            .catch((error) => {
                setError(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        fetch(`${BASE_URL}/posts/${postId}/comments`, {
            mode: "cors",
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.message) {
                        throw new Error("Error: 404 Page not Found");
                    }
                    setComments(() => {
                        return (
                            <>
                                {result.reverse().map((comment: comment) => (
                                    <li
                                        key={comment._id}
                                        id={comment._id}
                                        className="comment"
                                    >
                                        <h3>{comment.author}</h3>
                                        <p>{comment.content}</p>
                                        <span>
                                            {new Date(comment.publishedAt)
                                                .toISOString()
                                                .replace(/T/, " ")
                                                .replace(/\..+/, "")}
                                        </span>
                                    </li>
                                ))}
                            </>
                        );
                    });
                },
                (error) => {
                    setError(error);
                }
            )
            .catch((error) => {
                setError(error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newComment]);
    if (error) {
        return <ErrorMessage message={error.message} />;
    } else if (!isLoaded) {
        return <Loading />;
    } else {
        return (
            <div>
                <div className="post">
                    <h1>{post?.title}</h1>
                    <p>{post?.content}</p>
                    <span>
                        {post?.publishedAt
                            ? new Date(post.publishedAt)
                                  .toISOString()
                                  .replace(/T/, " ")
                                  .replace(/\..+/, "")
                            : ""}
                    </span>
                </div>

                <ul className="comment-container">
                    <header>Comments</header>
                    {authed && (
                        <form
                            className="form comment-form"
                            onSubmit={commentSubmitted}
                            action=""
                            method="GET"
                        >
                            <label htmlFor="comment">
                                comment as{" "}
                                <span>{localStorage.getItem("username")}</span>
                            </label>
                            <textarea
                                name="comment"
                                id="comment"
                                cols={20}
                                rows={10}
                            ></textarea>

                            <input type="submit" value="comment" />
                            {commentFormErrors}
                        </form>
                    )}
                    {comments}
                </ul>
            </div>
        );
    }
}
export default Post;
