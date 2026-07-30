import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCalendarCheck,
  FaRobot,
  FaUserCircle,
  FaUserMd,
  FaSignOutAlt
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getPatientAppointments,
  cancelAppointment,
} from "../services/appointmentService";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authService";

import "./Dashboard.css";

function PatientDashboard() {

  const navigate = useNavigate();

  const user = getCurrentUser();

  const [appointments, setAppointments] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [loadError, setLoadError] = useState("");

  useEffect(() => {

    loadAppointments();

  }, []);

  async function loadAppointments() {

    try {

      setIsLoading(true);

      const data =
        await getPatientAppointments();

      setAppointments(data);

      setLoadError("");

    }
    catch (error) {

      setLoadError(
        "Unable to load appointments."
      );

    }
    finally {

      setIsLoading(false);

    }

  }

  async function handleCancel(id) {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this appointment?"
      );

    if (!confirmCancel) return;

    try {

      await cancelAppointment(id);

      toast.success(
        "Appointment cancelled successfully."
      );

      loadAppointments();

    }
    catch {

      toast.error(
        "Unable to cancel appointment."
      );

    }

  }

  function handleLogout() {

    logoutUser();

    navigate("/login");

  }

  function formatDate(date) {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {

        day: "numeric",

        month: "long",

        year: "numeric",

      }

    );

  }

  function formatTime(time) {

    const [hour, minute] =
      time.split(":");

    return new Date(

      0,

      0,

      0,

      hour,

      minute

    ).toLocaleTimeString(

      "en-IN",

      {

        hour: "numeric",

        minute: "2-digit",

      }

    );

  }

  const upcoming = appointments.find(

    (appt) =>

      appt.status !== "Cancelled"

  );

  const history = appointments.filter(

    (appt) =>

      appt.id !== upcoming?.id

  );

  return (

    <div className="dash-page">

      {/* ================= NAVBAR ================= */}

      <nav className="dash-navbar">

        <div className="dash-navbar__brand">

          MediCare+

        </div>

        <ul className="dash-navbar__links">

          <li
            className="nav-link-btn active"
            onClick={() =>
              navigate("/patient/dashboard")
            }
          >

            Dashboard

          </li>

          <li
            className="nav-link-btn"
            onClick={() =>
              navigate("/patient/book")
            }
          >

            Book Appointment

          </li>

          <li
            className="nav-link-btn"
            onClick={() =>
              navigate("/patient/profile")
            }
          >

            Profile

          </li>

          <li
            className="nav-link-btn"
            onClick={() =>
              navigate("/patient/ai")
            }
          >

            AI Assistant

          </li>

        </ul>

        <div className="dash-navbar__right">

          <div className="dash-navbar__user">

            {user?.full_name?.charAt(0) || "P"}

          </div>

          <button

            className="dash-logout"

            onClick={handleLogout}

          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </nav>

      <div className="dash-body">      {/* ================= HERO ================= */}

      <div className="dashboard-hero">

        <div className="dashboard-hero-left">

          <h1>

            Welcome Back,

            <br />

            {user?.full_name}

          </h1>

          <p>

            Manage your appointments,
            connect with doctors,
            and use the AI Assistant
            from one modern dashboard.

          </p>

          <button
            className="hero-book-btn"
            onClick={() =>
              navigate("/patient/book")
            }
          >

            <FaCalendarCheck />

            <span>

              Book Appointment

            </span>

          </button>

        </div>

        <div className="dashboard-hero-right">

          <div className="hero-card">

            <h2>

              {appointments.length}

            </h2>

            <p>

              Total Appointments

            </p>

          </div>

          <div className="hero-card">

            <h2>

              {upcoming ? "1" : "0"}

            </h2>

            <p>

              Upcoming Visit

            </p>

          </div>

          <div className="hero-card">

            <h2>

              <FaRobot />

            </h2>

            <p>

              AI Assistant

            </p>

          </div>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="quick-actions">

        <div
          className="quick-card"
          onClick={() =>
            navigate("/patient/book")
          }
        >

          <div className="quick-icon">

            <FaCalendarCheck />

          </div>

          <h3>

            Book Appointment

          </h3>

          <p>

            Schedule an appointment
            with your preferred doctor.

          </p>

        </div>

        <div
          className="quick-card"
          onClick={() =>
            navigate("/patient/ai")
          }
        >

          <div className="quick-icon">

            <FaRobot />

          </div>

          <h3>

            AI Assistant

          </h3>

          <p>

            Get AI-powered
            healthcare assistance.

          </p>

        </div>

        <div
          className="quick-card"
          onClick={() =>
            navigate("/patient/profile")
          }
        >

          <div className="quick-icon">

            <FaUserCircle />

          </div>

          <h3>

            My Profile

          </h3>

          <p>

            Update your account
            and personal details.

          </p>

        </div>

        <div
          className="quick-card"
          onClick={() =>
            navigate("/patient/book")
          }
        >

          <div className="quick-icon">

            <FaUserMd />

          </div>

          <h3>

            Find Doctors

          </h3>

          <p>

            Browse available doctors
            and specialties.

          </p>

        </div>

      </div>

      {isLoading && (

        <div className="dash-loading">

          Loading appointments...

        </div>

      )}

      {loadError && (

        <div className="dash-error">

          {loadError}

        </div>

      )}

      {!isLoading && !loadError && (

        <>          {/* ================= UPCOMING APPOINTMENT ================= */}

          <div className="section-header">

            <h2>

              Upcoming Appointment

            </h2>

            <button
              className="view-all-btn"
              onClick={() =>
                navigate("/patient/book")
              }
            >

              Book New

            </button>

          </div>

          {upcoming ? (

            <div className="modern-card">

              <div className="upcoming-card__info">

                <h2>

                  <FaUserMd />

                  {" "}

                  {upcoming.doctor_name}

                </h2>

                <p>

                  <FaCalendarCheck />

                  {" "}

                  {formatDate(
                    upcoming.appointment_date
                  )}

                </p>

                <p>

                  🕒

                  {" "}

                  {formatTime(
                    upcoming.appointment_time
                  )}

                </p>

                <p>

                  <strong>Status:</strong>

                  <span
                    className={`status-badge status-${upcoming.status.toLowerCase()}`}
                  >

                    {upcoming.status}

                  </span>

                </p>

              </div>

              <div className="upcoming-card__actions">

                <button
                  className="cancel-btn"
                  onClick={() =>
                    handleCancel(
                      upcoming.id
                    )
                  }
                >

                  Cancel Appointment

                </button>

              </div>

            </div>

          ) : (

            <div className="upcoming-empty">

              No upcoming appointments.

            </div>

          )}

          {/* ================= HISTORY ================= */}

          <div className="section-header">

            <h2>

              Appointment History

            </h2>

          </div>

          {history.length === 0 ? (

            <div className="upcoming-empty">

              No appointment history.

            </div>

          ) : (

            <div className="appointment-grid">

              {history.map((appt) => (

                <div
                  className="history-card"
                  key={appt.id}
                >

                  <h3>

                    <FaUserMd />

                    {" "}

                    {appt.doctor_name}

                  </h3>

                  <p>

                    <FaCalendarCheck />

                    {" "}

                    {formatDate(
                      appt.appointment_date
                    )}

                  </p>

                  <p>

                    🕒

                    {" "}

                    {formatTime(
                      appt.appointment_time
                    )}

                  </p>

                  <div
                    className={`status-badge status-${appt.status.toLowerCase()}`}
                  >

                    {appt.status}

                  </div>

                </div>

              ))}

            </div>

          )}

        </>

      )}

      </div>

    </div>

  );

}

export default PatientDashboard;