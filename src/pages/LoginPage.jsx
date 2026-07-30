import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./LoginPage.css";

const ROLES = [
  { value: "patient", label: "Patient" },
  { value: "doctor", label: "Doctor" },
  { value: "admin", label: "Admin" },
];

function LoginPage() {
  const navigate = useNavigate();

  // ---- form state ----
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---- validation + submission state ----
  const [fieldErrors, setFieldErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setAuthError("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return; // stop here, show field errors, don't call the "server"
    }

    setIsSubmitting(true);
    const result = await loginUser({ role, email, password });
    setIsSubmitting(false);

    if (!result.success) {
      setAuthError(result.message);
      return;
    }

    // In a real build, this is where the auth token / user info
    // would be saved (e.g. in context or localStorage) before
    // redirecting. For now we just route by role.
    navigate(`/${result.user.role}/dashboard`);
  }

  return (
    <div className="login-page">
      <nav className="login-navbar">
        <span className="login-navbar__brand">MediCare+</span>
        <ul className="login-navbar__links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Doctors</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>

      <header className="login-hero">
        <h1>Book hospital appointments in minutes</h1>
        <p>Patients, doctors and admins — one simple system for everyone</p>
      </header>

      <main className="login-content">
        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <h2>Login to your account</h2>

          {authError && <div className="login-alert">{authError}</div>}

          <span className="login-field-label">Select role</span>
          <div className="role-selector">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                className={
                  "role-button" +
                  (role === r.value ? " role-button--active" : "")
                }
                onClick={() => setRole(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="login-field">
            <label className="login-field-label" htmlFor="email">
              Email or phone number
            </label>
            <input
              id="email"
              type="text"
              className={
                "login-input" + (fieldErrors.email ? " login-input--error" : "")
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            {fieldErrors.email && (
              <p className="login-field-error">{fieldErrors.email}</p>
            )}
          </div>

          <div className="login-field">
            <label className="login-field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={
                "login-input" +
                (fieldErrors.password ? " login-input--error" : "")
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {fieldErrors.password && (
              <p className="login-field-error">{fieldErrors.password}</p>
            )}
          </div>

          <button className="login-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>

          <p className="login-demo-hint">
            Demo login — patient@demo.com / patient123<br />
            doctor@demo.com / doctor123 &nbsp;·&nbsp; admin@demo.com / admin123
          </p>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
