import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/profile";

// Get Profile
export async function getProfile() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.user;
}

// Update Profile
export async function updateProfile(profileData) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(profileData)
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
}