import React from "react"
import NavigationBar from "./NavBar";
import "../styles/Post.css"
import { useNavigate } from "react-router-dom"

// this should be taking in the posts from the page created that provides template for all the posts.
// that will be Friend post in the pages section.
function FriendPost({post}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("sgt")
    const navigate = useNavigate()

    return (
        <div className="post-container">
            <img src={post.image} style={{width : "200px", height : "300px"}}></img>
            <p className="post-author" onClick={() => navigate(`/publicProfile/${post.author}`)}>
                Posted by: {post.author_username} 
            </p>
            <p className="post-title">Title: {post.title}</p>
            <p className="post-content">{post.content}</p>
            <p className="post-date">{formattedDate}</p>
        </div>
    );
}

export default FriendPost