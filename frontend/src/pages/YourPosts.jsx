import { useState, useEffect } from "react";
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function YourPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const navigate = useNavigate();

    // for generating the post list we will see on the homepage
    const getPosts = () => {
        social
            .get("/social/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    // this will delete the posts
    const deletePost = (id) => {
        social
            .delete(`/social/posts/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Post deleted!");
                else alert("Failed to delete post.");
                getPosts();
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <NavigationBar />
            <div>
                <h2>Your Posts</h2>
                {posts.map((post) => (
                    <Post post={post} onDelete={deletePost} key = {post.id}/>
                ))}
            </div>
        </div>
    );
}

export default YourPosts;