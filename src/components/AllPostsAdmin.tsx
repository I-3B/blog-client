import React, { useEffect, useState } from "react";
import PostCardAdmin from "../components/PostCardAdmin";
import { BASE_URL } from "../index";
import post from "../interfaces/post";
import "../style/AllPosts.scss";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
function AllPostsAdmin() {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState<post[]>([]);
    useEffect(() => {
        const token = String(localStorage.getItem("token"));
        fetch(BASE_URL + "/admin/posts", {
            mode: "cors",
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPosts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, error]);
    if (error) {
        return <ErrorMessage message={error.message} />;
    } else if (!isLoaded) {
        return <Loading />;
    } else {
        return (
            <>
                <ul className="posts-container">
                    <li className="new-post">
                        <a href="/admin/new">New Post+</a>
                    </li>
                    {posts.reverse().map((post: post) => (
                        <li key={post._id}>
                            <PostCardAdmin post={post} />
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default AllPostsAdmin;
