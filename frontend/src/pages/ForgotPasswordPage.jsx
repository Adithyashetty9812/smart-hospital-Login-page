import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/authService";
import "./AuthPages.css";

const ROLES = [
  { value: "patient", label: "Patient" },
  { value: "doctor",  label: "Doctor"  },
  { value: "admin",   label: "Admin"   },
];

function ForgotPasswordPage() {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    const result = await requestPasswordReset({ role, email });
    setIsSubmitting(false);
    setSuccessMessage(result.message);
  }

  return (
    <div className="auth-page">
      <nav className="auth-navbar">
        <span className="auth-navbar__brand">MediCare+</span>
        <ul className="auth-navbar__links"><li><a href="#">Home</a></li></ul>
      </nav>
      <header className="auth-hero">
        <h1>Reset your password</h1>
        <p>We'll send reset instructions to your registered email</p>
      </header>
      <main className="auth-content">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <h2>Forgot password</h2>
          <p className="auth-card__subtitle">Select your role and enter the email you registered with.</p>
          {successMessage && <div className="auth-alert auth-alert--success">{successMessage}</div>}
          <span className="auth-field-label">Select role</span>
          <div className="role-selector">
            {ROLES.map((r) => (
              <button key={r.value} type="button"
                className={"role-button" + (role === r.value ? " role-button--active" : "")}
                onClick={() => setRole(r.value)}>{r.label}</button>
            ))}
          </div>
          <div className="auth-field">
            <label className="auth-field-label" htmlFor="email">Registered email</label>
            <input id="email" type="text"
              className={"auth-input" + (fieldErrors.email ? " auth-input--error" : "")}
              value={email} onChange={(e) => setEmail(e.target.value)} />
            {fieldErrors.email && <p className="auth-field-error">{fieldErrors.email}</p>}
          </div>
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset instructions"}
          </button>
          <p className="auth-footer-links">Remembered it? <Link to="/login">Back to login</Link></p>
        </form>
      </main>
    </div>
  );
}

export default ForgotPasswordPage;
