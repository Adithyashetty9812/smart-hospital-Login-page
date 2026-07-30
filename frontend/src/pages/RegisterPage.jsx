import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./AuthPages.css";

const ROLES = [
  { value: "patient", label: "Patient" },
  { value: "doctor",  label: "Doctor"  },
  { value: "admin",   label: "Admin"   },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const errors = {};
    if (!name.trim()) errors.name = "Full name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!phone.trim()) errors.phone = "Phone number is required.";
    else if (!/^[0-9]{10}$/.test(phone.trim())) errors.phone = "Enter a valid 10-digit phone number.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError("");
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    const result = await registerUser({ role, name, email, phone, password });
    setIsSubmitting(false);
    if (!result.success) { setAuthError(result.message); return; }
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <nav className="auth-navbar">
        <span className="auth-navbar__brand">MediCare+</span>
        <ul className="auth-navbar__links"><li><a href="#">Home</a></li></ul>
      </nav>
      <header className="auth-hero">
        <h1>Create your account</h1>
        <p>Sign up once, book appointments anytime</p>
      </header>
      <main className="auth-content">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <h2>Register</h2>
          <p className="auth-card__subtitle">Your role decides what you can do after logging in.</p>
          {authError && <div className="auth-alert auth-alert--error">{authError}</div>}
          <span className="auth-field-label">Register as</span>
          <div className="role-selector">
            {ROLES.map((r) => (
              <button key={r.value} type="button"
                className={"role-button" + (role === r.value ? " role-button--active" : "")}
                onClick={() => setRole(r.value)}>{r.label}</button>
            ))}
          </div>
          {[
            { id: "name", label: "Full name", value: name, set: setName, type: "text", hint: null },
            { id: "email", label: "Email address", value: email, set: setEmail, type: "text", hint: null },
            { id: "phone", label: "Phone number", value: phone, set: setPhone, type: "text", hint: "10-digit number" },
            { id: "password", label: "Password", value: password, set: setPassword, type: "password", hint: "At least 6 characters." },
            { id: "confirmPassword", label: "Confirm password", value: confirmPassword, set: setConfirmPassword, type: "password", hint: null },
          ].map(({ id, label, value, set, type, hint }) => (
            <div className="auth-field" key={id}>
              <label className="auth-field-label" htmlFor={id}>{label}</label>
              <input id={id} type={type}
                className={"auth-input" + (fieldErrors[id] ? " auth-input--error" : "")}
                value={value} onChange={(e) => set(e.target.value)} placeholder={hint || ""} />
              {fieldErrors[id] ? <p className="auth-field-error">{fieldErrors[id]}</p>
                : hint && !fieldErrors[id] ? <p className="auth-field-hint">{hint}</p> : null}
            </div>
          ))}
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
          <p className="auth-footer-links">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;
