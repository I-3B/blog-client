import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { BASE_URL } from "../index";
import post from "../interfaces/post";
import "../style/AllPosts.scss";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
function AllPosts() {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState<post[]>([]);
    useEffect(() => {
        fetch(BASE_URL + "/posts", {
            mode: "cors",
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
    }, []);
    if (error) {
        return <ErrorMessage message={error.message} />;
    } else if (!isLoaded) {
        return <Loading />;
    } else {
        return (
            <>
                <ul className="posts-container">
                    {posts.map((post) => (
                        <li key={post._id} id={post._id}>
                            {PostCard(post)}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default AllPosts;
