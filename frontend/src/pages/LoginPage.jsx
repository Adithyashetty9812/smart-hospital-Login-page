import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHospital,
  FaUserMd,
  FaRobot,
  FaCalendarCheck,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

import "./AuthPages.css";

const ROLES = [
  {
    value: "patient",
    label: "Patient",
  },
  {
    value: "doctor",
    label: "Doctor",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

function LoginPage() {

  const navigate = useNavigate();

  const [role, setRole] = useState("patient");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [fieldErrors, setFieldErrors] =
    useState({});

  const [authError, setAuthError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  function validate() {

    const errors = {};

    if (!email.trim()) {

      errors.email =
        "Email is required.";

    }
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

      errors.email =
        "Enter a valid email.";

    }

    if (!password) {

      errors.password =
        "Password is required.";

    }
    else if (password.length < 6) {

      errors.password =
        "Minimum 6 characters.";

    }

    return errors;

  }

  async function handleSubmit(e) {

    e.preventDefault();

    setAuthError("");

    const errors =
      validate();

    setFieldErrors(errors);

    if (
      Object.keys(errors).length > 0
    ) {

      return;

    }

    setIsSubmitting(true);

    try {

      const result =
        await loginUser({

          email,

          password,

        });

      setIsSubmitting(false);

      if (!result.success) {

        toast.error(result.message);

        setAuthError(result.message);

        return;

      }

      if (

        result.user.role.toLowerCase() !==
        role.toLowerCase()

      ) {

        toast.error(
          "Incorrect role selected."
        );

        setAuthError(
          `This account belongs to "${result.user.role}".`
        );

        return;

      }

      toast.success(
        "Login Successful!"
      );

      navigate(
        `/${result.user.role}/dashboard`
      );

    }
    catch {

      setIsSubmitting(false);

      toast.error(
        "Server connection failed."
      );

      setAuthError(
        "Unable to connect to the server."
      );

    }

  }

  return (

    <div className="modern-login-page">
            <div className="login-left">

        <div className="login-overlay">

          <div className="login-logo">

            <FaHospital />

            <span>MediCare+</span>

          </div>

          <h1>

            Smart Hospital
            <br />
            Appointment
            <br />
            Management

          </h1>

          <p>

            One secure platform for Patients,
            Doctors and Administrators.

            Book appointments, manage healthcare,
            and get AI assistance anytime.

          </p>

          <div className="login-feature-list">

            <div className="login-feature">

              <FaCalendarCheck />

              <span>

                Online Appointment Booking

              </span>

            </div>

            <div className="login-feature">

              <FaRobot />

              <span>

                AI Healthcare Assistant

              </span>

            </div>

            <div className="login-feature">

              <FaUserMd />

              <span>

                Verified Medical Specialists

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RIGHT LOGIN ================= */}

      <div className="login-right">

        <form

          className="login-card"

          onSubmit={handleSubmit}

          noValidate

        >

          <h2>

            Welcome Back 👋

          </h2>

          <p className="login-subtitle">

            Sign in to continue to your dashboard.

          </p>

          {authError && (

            <div className="auth-alert auth-alert--error">

              {authError}

            </div>

          )}

          <label className="auth-field-label">

            Login as

          </label>

          <div className="role-selector">

            {ROLES.map((r) => (

              <button

                key={r.value}

                type="button"

                className={
                  "role-button" +
                  (role === r.value
                    ? " role-button--active"
                    : "")
                }

                onClick={() =>
                  setRole(r.value)
                }

              >

                {r.label}

              </button>

            ))}

          </div>

          <div className="auth-field">

            <label className="auth-field-label">

              Email

            </label>

            <div className="input-icon-group">

              <FaEnvelope />

              <input

                type="email"

                className={
                  "auth-input" +
                  (fieldErrors.email
                    ? " auth-input--error"
                    : "")
                }

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                placeholder="Enter your email"

              />

            </div>

            {fieldErrors.email && (

              <p className="auth-field-error">

                {fieldErrors.email}

              </p>

            )}

          </div>
                    <div className="auth-field">

            <label className="auth-field-label">

              Password

            </label>

            <div className="input-icon-group">

              <FaLock />

              <input

                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                className={
                  "auth-input" +
                  (fieldErrors.password
                    ? " auth-input--error"
                    : "")
                }

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                placeholder="Enter your password"

              />

              <button

                type="button"

                className="password-toggle"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </button>

            </div>

            {fieldErrors.password && (

              <p className="auth-field-error">

                {fieldErrors.password}

              </p>

            )}

          </div>

          <button

            type="submit"

            className="auth-submit"

            disabled={isSubmitting}

          >

            {isSubmitting
              ? "Signing In..."
              : "Sign In"}

          </button>

          <div className="login-links">

            <Link to="/forgot-password">

              Forgot Password?

            </Link>

            <Link to="/register">

              Create Account

            </Link>

          </div>

        </form>

      </div>

    </div>

  );

}

export default LoginPage;