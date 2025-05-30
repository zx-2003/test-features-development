import React from "react"
import "../styles/Post.css"
import { useNavigate } from "react-router-dom"

function PostExplore({post}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("sgt")

    const navigate = useNavigate()

    return (
        <div className="post-container">
            <p className="post-author" onClick={() => navigate(`/publicProfile/${post.author}`)}>
                Posted by: {post.author_username} 
            </p>
            <p className="post-title">Title: {post.title}</p>
            <p className="post-content">{post.content}</p>
            <p className="post-date">{formattedDate}</p>
        </div>        
    );
}

export default PostExplore