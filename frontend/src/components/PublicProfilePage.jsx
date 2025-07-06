import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { accountsApi } from "../api/social";
import NavigationBar from "./NavBar";
import "../styles/Profile.css"
import DefaultProfilePicture from "../assets/Default_Profile_Picture.png"

function PublicProfilePage() {
  const { user_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [user_id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await accountsApi.publicProfile(user_id);
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
    try {
      // this will help us to update the follow / unfollow in the backend
      const res = await accountsApi.followUser(profile.user.id);
      // this result is the current status of whether we are following the particular person or not
      const newIsFollowing = res.data.is_following;
      // from there we dynamically update the page to display how many fellas the guy has following him etc.
      setProfile(prev => ({
        ...prev,
        is_following: newIsFollowing,
        followers_count: prev.followers_count + (newIsFollowing ? 1 : -1),
      }));
      console.log(profile.user.username);
      console.log(profile.profile_picture);
    } catch (error) {
      alert("Failed to follow/unfollow user.");
      console.error(error);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data found</div>;

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <img className="profile-picture"
          src={profile.profile_picture || DefaultProfilePicture}>  
        </img>

        <div className="profile-info">
          <h4>Username: {profile.user.username}</h4>
          <h4>Follower Count: {profile.followers_count}</h4>
          <h4>Following Count: {profile.following_count}</h4>
          <h4>Dietary Preferences: {profile.dietary_requirements.join(", ")}</h4>
          <h4>Cuisine Preferences: {profile.dietary_preferences.join(", ")}</h4>

          <button onClick={handleFollowToggle}>
            {profile.is_following ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicProfilePage;

