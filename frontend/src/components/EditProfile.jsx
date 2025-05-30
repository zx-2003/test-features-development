import NavigationBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { accountsApi } from "../api/social";

const EditProfile = () => {
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await accountsApi.getProfile();
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setDietaryPreferences(res.data.dietary_preferences || "");
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    try {
      // Update dietary preferences via profile
      // await accountsApi.updateProfile({ dietaryPreferences });

      await accountsApi.updateProfile({
        dietary_preferences: dietaryPreferences,
      });

      // Update user (only username/email)
      await accountsApi.updateUser({ username, email });

      // Change password if needed
      if (oldPassword && newPassword) {
        await accountsApi.changePassword({
          old_password: oldPassword,
          new_password: newPassword,
        });
      }

      setStatus("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <NavigationBar />

      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <label>
          Dietary Preferences:
          <input
            type="text"
            value={dietaryPreferences}
            onChange={(e) => setDietaryPreferences(e.target.value)}
          />
        </label>
        <br />

        <label>
          Old Password:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>
        <br />

        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Update Profile</button>
      </form>
      {status && <p style={{ color: "green" }}>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EditProfile;



