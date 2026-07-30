import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import "./Dashboard.css";

function ProfilePage() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const data = await getProfile();

      setProfile(data);

    } catch {

      alert("Unable to load profile.");

    } finally {

      setLoading(false);

    }

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await updateProfile({

        full_name: profile.full_name,

        phone: profile.phone,

      });

      alert("Profile updated successfully!");

      navigate("/patient/dashboard");

    } catch {

      alert("Unable to update profile.");

    }

  }

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="dash-page">

      <div className="dash-body">

        <section className="dash-welcome">

          <h1>
            My Profile
          </h1>

          <p>
            View and update your personal information.
          </p>

        </section>

        <form
          className="profile-card"
          onSubmit={handleSubmit}
        >

          <label className="profile-label">
            Full Name
          </label>

          <input
            type="text"
            value={profile.full_name}
            onChange={(e) =>
              setProfile({
                ...profile,
                full_name: e.target.value,
              })
            }
          />

          <br />
          <br />

          <label className="profile-label">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            disabled
          />

          <br />
          <br />

          <label className="profile-label">
            Phone
          </label>

          <input
            type="text"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
          />

          <br />
          <br />

          <label className="profile-label">
            Role
          </label>

          <input
            type="text"
            value={profile.role}
            disabled
          />

          <br />
          <br />

          <div className="profile-actions">

            <button
              className="dash-primary-btn"
              type="submit"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="btn-outline"
              style={{ marginLeft: "15px" }}
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>

            <button
              type="button"
              className="btn-outline"
              style={{ marginLeft: "15px" }}
              onClick={() => navigate("/patient/dashboard")}
            >
              Back
            </button>
          </div>
        </form>

      </div>

    </div>

  );

}

export default ProfilePage;