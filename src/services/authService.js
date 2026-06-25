/**
 * Mock authentication service.
 *
 * There is no backend yet, so this file simulates what the real
 * Node.js + Express login API will eventually do:
 *   - receive { role, email, password }
 *   - check credentials
 *   - return either a success (with a fake user object)
 *     or a failure (with an error message)
 *
 * WHEN THE REAL BACKEND IS READY:
 * Replace the body of `loginUser` with a real fetch/axios call, e.g.
 *
 *   export async function loginUser({ role, email, password }) {
 *     const response = await fetch("http://localhost:5000/api/login", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify({ role, email, password }),
 *     });
 *     if (!response.ok) {
 *       const err = await response.json();
 *       return { success: false, message: err.message };
 *     }
 *     const data = await response.json();
 *     return { success: true, user: data.user };
 *   }
 *
 * No other file needs to change when that happens — every page
 * that needs login only imports `loginUser` from here.
 */

// Fake "database" of users, just for demo purposes during this
// frontend-only stage of the project.
const MOCK_USERS = [
  { role: "patient", email: "patient@demo.com", password: "patient123", name: "Aditya Shetty" },
  { role: "doctor", email: "doctor@demo.com", password: "doctor123", name: "Dr. Sunita Rao" },
  { role: "admin", email: "admin@demo.com", password: "admin123", name: "Hospital Admin" },
];

const ARTIFICIAL_DELAY_MS = 600; // pretend this is network latency

export function loginUser({ role, email, password }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = MOCK_USERS.find(
        (u) => u.role === role && u.email === email && u.password === password
      );

      if (!match) {
        resolve({
          success: false,
          message: "Invalid email or password for the selected role.",
        });
        return;
      }

      resolve({
        success: true,
        user: { name: match.name, role: match.role, email: match.email },
      });
    }, ARTIFICIAL_DELAY_MS);
  });
}
