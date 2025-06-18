import React, { useState } from "react"
import "../styles/Post.css"
import { useNavigate } from "react-router-dom"
import { toggleLike } from "../api/social"

function PostExplore({post}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("sgt")
    const navigate = useNavigate()

    // new states for the liked state of the post and liking the post
    const [liked, setLiked] = useState(post.is_liked);
    const [likeCount, setLikeCount] = useState(post.like_count);

    const handleLikeToggle = async () => {
        try {
            const res = await toggleLike(post.id);
            setLiked(res.data.liked);
            setLikeCount(res.data.like_count);
            console.log("API response", res.data);

        } catch (err) {
            console.error(err);
            alert("failed to like/unlike the post");
        }
    }

    return (
        <div className="post-container">
            <img src={post.image} style={{width : "200px", height : "300px"}}></img>
            <p className="post-author" onClick={() => navigate(`/publicProfile/${post.author}`)}>
                Posted by: {post.author_username} 
            </p>
            <p className="post-title">Title: {post.title}</p>
            <p className="post-content">{post.content}</p>
            <p className = "location">Location: {post.location}</p>
            <p className="rating">Rating: {"⭐".repeat(post.rating)}</p>
            <p className="post-date">{formattedDate}</p>
            <button style={{ border: "none" }} onClick={handleLikeToggle}>
                {liked ? "❤️": "🤍"} {likeCount}
            </button>
        </div>        
    );
}

export default PostExplore