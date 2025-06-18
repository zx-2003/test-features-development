import NavigationBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { accountsApi } from "../api/social";
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
  const [dietaryPreferences, setDietaryRequirements] = useState([]);
  const [cuisinePreferences, setCuisinePreferences] = useState([]);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const DIETARY_REQUIREMENTS = [ 
    "vegetarian",
    "vegan",
    "halal",
    "kosher",
    "gluten_free",
    "dairy_free",
    // new fields
    "nut_free",
  ];

  const DIETARY_PREFERENCES = [
    "italian",
    "japanese",
    "thai",
    "indian",
    "chinese",
    "mexican",
    "korean",
    "french",
    // new fields
    "african",
    "american",
    "asian",
    "brazilian",
    "greek",
    "indonesian",
    "spanish",
    "turkish",
    "mediterranean",
    "lebanese",
    "middle_eastern",
  ];

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await accountsApi.getProfile();
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setDietaryRequirements(res.data.dietary_requirements || []);
        setCuisinePreferences(res.data.dietary_preferences || []);
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

    const formData = new FormData();
    dietaryPreferences.forEach(pref => formData.append("dietary_requirements", pref));
    cuisinePreferences.forEach(pref => formData.append("dietary_preferences", pref));

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      await accountsApi.updateProfile(formData);

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
      navigate("/profile");
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
          Profile Picture:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          >
          </input>
        </label>
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
          <select
            multiple
            value={dietaryPreferences}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setDietaryRequirements(selected);
            }}
          >
            {DIETARY_REQUIREMENTS.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Cuisine Preferences:
          <select
            multiple
            value={cuisinePreferences}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setCuisinePreferences(selected);
            }}
          >
            {DIETARY_PREFERENCES.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
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



