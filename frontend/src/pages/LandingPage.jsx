import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./AuthPages.css";

function LandingPage() {

  const navigate = useNavigate();

  const homeRef = useRef(null);

  const doctorsRef = useRef(null);

  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {

    ref.current?.scrollIntoView({

      behavior: "smooth"

    });

  };

  return (

    <div className="auth-page">

      {/* ================= NAVBAR ================= */}

      <nav className="auth-navbar">

        <div className="auth-navbar__brand">

          🏥 MediCare+

        </div>

        <ul className="auth-navbar__links">

          <li>

            <button
              onClick={() =>
                scrollToSection(homeRef)
              }
            >

              Home

            </button>

          </li>

          <li>

            <button
              onClick={() =>
                scrollToSection(doctorsRef)
              }
            >

              Doctors

            </button>

          </li>

          <li>

            <button
              onClick={() =>
                scrollToSection(aboutRef)
              }
            >

              About

            </button>

          </li>

          <li>

            <Link
              className="nav-login-btn"
              to="/login"
            >

              Login

            </Link>

          </li>

          <li>

            <Link
              className="nav-register-btn"
              to="/register"
            >

              Register

            </Link>

          </li>

        </ul>

      </nav>

      {/* ================= HERO ================= */}

      <header
        className="auth-hero"
        ref={homeRef}
      >

        <h1>

          Smart Healthcare

          <br />

          Powered by AI

        </h1>

        <p>

          Book appointments instantly,

          chat with our AI Assistant,

          connect with experienced doctors,

          and manage your healthcare

          all in one secure platform.

        </p>

        <div className="hero-buttons">

          <button

            className="hero-primary-btn"

            onClick={() =>
              navigate("/login")
            }

          >

            🚀 Get Started

          </button>

          <button

            className="hero-secondary-btn"

            onClick={() =>
              scrollToSection(doctorsRef)
            }

          >

            👨‍⚕️ Meet Doctors

          </button>

        </div>

      </header>

      {/* ================= STATS ================= */}

      <section className="hero-stats">
                <div className="hero-stat-card">

          <h2>120+</h2>

          <p>Qualified Doctors</p>

        </div>

        <div className="hero-stat-card">

          <h2>15K+</h2>

          <p>Happy Patients</p>

        </div>

        <div className="hero-stat-card">

          <h2>24×7</h2>

          <p>AI Assistance</p>

        </div>

        <div className="hero-stat-card">

          <h2>98%</h2>

          <p>Patient Satisfaction</p>

        </div>

      </section>

      {/* ================= DOCTORS ================= */}

      <section
        className="doctors-section"
        ref={doctorsRef}
      >

        <h2>

          Meet Our Specialists

        </h2>

        <p>

          Experienced doctors dedicated to providing
          exceptional healthcare for every patient.

        </p>

        <div className="doctor-grid">

          <div className="doctor-card">

            <div className="doctor-avatar">

              👨‍⚕️

            </div>

            <h3>

              Cardiologist

            </h3>

            <p>

              Heart & Blood Pressure

            </p>

          </div>

          <div className="doctor-card">

            <div className="doctor-avatar">

              🩺

            </div>

            <h3>

              General Physician

            </h3>

            <p>

              Primary Healthcare

            </p>

          </div>

          <div className="doctor-card">

            <div className="doctor-avatar">

              🦴

            </div>

            <h3>

              Orthopedic

            </h3>

            <p>

              Bone & Joint Care

            </p>

          </div>

          <div className="doctor-card">

            <div className="doctor-avatar">

              🧠

            </div>

            <h3>

              Neurologist

            </h3>

            <p>

              Brain & Nervous System

            </p>

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section
        className="about-section"
        ref={aboutRef}
      >
                <h2>

          About MediCare+

        </h2>

        <p>

          MediCare+ is a modern Hospital Appointment
          Management System that connects patients,
          doctors and administrators through one
          secure platform.

        </p>

        <div className="about-features">

          <div>

            🤖 AI Health Assistant

          </div>

          <div>

            📅 Easy Appointment Booking

          </div>

          <div>

            👨‍⚕️ Expert Doctors

          </div>

          <div>

            🔒 Secure Medical Records

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="next-page-section">

        <h2>

          Ready to Experience MediCare+?

        </h2>

        <p>

          Continue to the secure login page to
          access your dashboard, appointments,
          reports and AI Assistant.

        </p>

        <button

          className="next-page-btn"

          onClick={() => navigate("/login")}

        >

          Continue to Login →

        </button>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="auth-footer">

        © 2026 MediCare+ |
        Smart Hospital Appointment Management System

      </footer>

    </div>

  );

}

export default LandingPage;
    