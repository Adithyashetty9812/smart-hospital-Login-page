import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/doctors";

export async function getDoctors() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Unable to load doctors");
  }

  return data.doctors;
}