import post from "../interfaces/post";
import "../style/PostCard.scss";
import { htmlDecode } from "./Post";
function PostCard(props: post) {
    return (
        <a href={`/posts/${props._id}`} className="post-card">
            <h3>{htmlDecode(props.title)}</h3>
            <div className="fade-container">
                <p className="fade">
                    {htmlDecode(props.content.substring(0, 500))}...
                </p>
                <p className="continue">Continue reading</p>
            </div>
            <span className="date">
                {new Date(props.publishedAt)
                    .toISOString()
                    .replace(/T/, " ")
                    .replace(/\..+/, "")}
            </span>
        </a>
    );
}
export default PostCard;
