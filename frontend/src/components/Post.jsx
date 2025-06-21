import React from "react"
import "../styles/Post.css"
import { Link, useNavigate } from "react-router-dom"

function Post({post, onDelete}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("sgt")

    const navigate = useNavigate()

    return (
        <div className = "post-container">
            <img src={post.image} className="post-image"></img>
            <p className = "post-author">Posted by: {post.author_username}</p>
            <p className = "post-title">Title: {post.title}</p>
            <p className = "post-content">{post.content}</p>
            {
                post.location !== "" && (
                    <p className = "location">Location: {post.location}</p>
                )
            }
            {
                post.rating !== null && (
                    <p className = "rating">Rating: {"⭐".repeat(post.rating)}</p>
                )
            }
            <p className = "like-count">❤️{post.like_count}</p>
            <p className = "post-date">{formattedDate}</p>
            <button className="delete-button" onClick = {() => onDelete(post.id)}>
                Delete
            </button>
        </div>        
    );
}

export default Post