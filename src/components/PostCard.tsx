import post from "../interfaces/post";
import "../style/PostCard.scss";
function PostCard(props: post) {
    return (
        <a href={`/posts/${props._id}`} className="post-card">
            <h3>{props.title}</h3>
            <div className="fade-container">
                <p className="fade">{props.content.substring(0, 500)}...</p>
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
