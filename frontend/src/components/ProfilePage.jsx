import React, {useEffect, useState} from "react"
import { accountsApi } from "../api/social"
import NavigationBar from "./NavBar";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await accountsApi.getProfile();
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Make sure you're logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <NavigationBar />

      <h2>My Profile</h2>
      <p><strong>Username:</strong> {profile.user.username}</p>
      <p><strong>Email:</strong> {profile.user.email}</p>
      <p><strong>Dietary Preferences:</strong> {profile.dietary_preferences}</p>
      <p><strong>Followers:</strong> {profile.followers_count}</p>
      <p><strong>Following:</strong> {profile.following_count}</p>

      <h3>My Posts</h3>
      {profile.user_posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {profile.user_posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;