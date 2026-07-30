const API_URL = "http://localhost:5000/api/auth";

// ================= LOGIN =================
export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

// ================= REGISTER =================
export async function registerUser({
  role,
  name,
  email,
  phone,
  password,
}) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: name,
        email,
        phone,
        password,
        role,
      }),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

// ================= FORGOT PASSWORD =================
// Placeholder until a backend endpoint is created.
export async function requestPasswordReset({ role, email }) {
  return {
    success: true,
    message:
      "Password reset functionality is not implemented yet. Please contact the administrator.",
  };
}

// ================= LOGOUT =================
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// ================= CURRENT USER =================
export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// ================= TOKEN =================
export function getToken() {
  return localStorage.getItem("token");
}

// ================= LOGIN STATUS =================
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}