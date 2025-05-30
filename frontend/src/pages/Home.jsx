import { useState, useEffect } from "react";
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getPosts();
    }, []);

    const navigate = useNavigate();

    // we will get the info from the backend through our api/posts/
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

    // creates a post request that is sent to the backend to create a new post. 
    const createPost = (e) => {
        e.preventDefault();
        console.log({ title, content });
        social
            .post("/social/posts/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Post created!");
                else alert("Failed to make Post.");
                getPosts();
            })
            .catch((err) => {
                if (err.response) {
                    console.error("Error response:", err.response.data); // This shows validation errors
                } else {
                    console.error("Unexpected error:", err);
                }
                alert("Failed to create post.");
            });
    };

    // the home page will have this form that will change the state of the items specified above such that creating / delting
    // post will update in the backend as well
    return (
        <div>
            <NavigationBar />
            <div>
                <h2>Posts</h2>
                {posts.map((post) => (
                    <Post post={post} onDelete={deletePost} key = {post.id}/>
                ))}
            </div>
            <h2>Create a Post</h2>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;