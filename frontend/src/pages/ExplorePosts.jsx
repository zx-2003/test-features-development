import { useState, useEffect } from "react";
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import PostExplore from "../components/PostExplore";

function ExplorePosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getExplorePosts();
    }, []);

    const getExplorePosts = () => {
        social
            .get("/social/explore_posts/")
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
            <h2>What's the recent buzz about?</h2>
            <div>
                {posts.map((post) => (
                    <PostExplore post={post} key = {post.id}/>
                ))}
            </div>
        </div>
    )
}

export default ExplorePosts