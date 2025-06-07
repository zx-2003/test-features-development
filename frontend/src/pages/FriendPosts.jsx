import { useState, useEffect } from "react";
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import FriendPost from "../components/FriendPost";

function FriendPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getExplorePosts();
    }, []);

    const getExplorePosts = () => {
        social
            .get("/social/following_posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    }

    return (
        <div>
            <NavigationBar />
            <h2>See what your friends have been up to</h2>
            <div>
                {posts.map((post) => (
                    <FriendPost post={post} key = {post.id}/>
                ))}
            </div>
        </div>
    )
}

export default FriendPosts