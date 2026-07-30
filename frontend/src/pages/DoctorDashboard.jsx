import {
  FaUser,
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaSave,
  FaEdit,
  FaTrash,
  FaStethoscope,
  FaBriefcase
} from "react-icons/fa";

import {
  MdOutlineMedicalServices
} from "react-icons/md";

import {
  HiOutlineDocumentText
} from "react-icons/hi2";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getDoctorAppointments,
  getPatientDetail,
  updateAppointmentStatus
} from "../services/doctorDashboardService";

import { logoutUser } from "../services/authService";

import "./Dashboard.css";

function DoctorDashboard() {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openAppointmentId, setOpenAppointmentId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [statusChanges, setStatusChanges] = useState({});
  useEffect(() => {

    loadAppointments();
    setSelectedPatient(null);
    setOpenAppointmentId(null);
    setStatusChanges({});

  }, []);

  async function loadAppointments() {

    try {

      setLoading(true);

      const data = await getDoctorAppointments();

      setAppointments(data);

      setError("");

    }

    catch {

      setError("Unable to load appointments.");

      toast.error("Unable to load appointments.");

    }

    finally {

      setLoading(false);

    }

  }

  async function handleViewDetails(appointment) {

    if (openAppointmentId === appointment.id) {

      setOpenAppointmentId(null);

      setSelectedPatient(null);

      return;

    }

    try {

      const patient = await getPatientDetail(
        appointment.id
      );

      setSelectedPatient(patient);

      setOpenAppointmentId(appointment.id);

    }

    catch {

      toast.error(
        "Unable to load patient details."
      );

    }

  }

  function handleStatusChange(id, status) {

    setStatusChanges((previous) => ({

      ...previous,

      [id]: status

    }));

  }


  async function handleSaveStatus(id) {

    try {

      await updateAppointmentStatus(

        id,

        statusChanges[id] || appointments.find(
          appointment => appointment.id === id
        )?.status

      );

      toast.success("Status updated successfully.");

      await loadAppointments();

      setSelectedPatient(null);

      setStatusChanges({});

    }

    catch {

      toast.error("Unable to update status.");

    }

  }


  function handleLogout() {

    logoutUser();

    navigate("/login");

  }
  function formatDate(date) {

    return new Date(date).toLocaleDateString("en-IN", {

      day: "2-digit",

      month: "short",

      year: "numeric"

    });

  }

  function formatTime(time) {

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(hours);

    date.setMinutes(minutes);

    return date.toLocaleTimeString("en-IN", {

      hour: "numeric",

      minute: "2-digit",

      hour12: true

    });

  }
  function getStatusClass(status) {

    switch (status) {

      case "Confirmed":
        return "status-confirmed";

      case "Cancelled":
        return "status-cancelled";

      case "Completed":
        return "status-completed";

      default:
        return "status-pending";

    }

  }

  const pendingCount = useMemo(() => {

    return appointments.filter(

      appointment =>

        appointment.status === "Pending"

    ).length;

  }, [appointments]);

  const confirmedCount = useMemo(() => {

    return appointments.filter(

      appointment =>

        appointment.status === "Confirmed"

    ).length;

  }, [appointments]);
  return (

    <div className="dash-page">

      <nav className="dash-navbar">

        <div className="dash-navbar__brand">

          MediCare+

        </div>

        <ul className="dash-navbar__links">

          <li>

            <button className="nav-link-btn active">

              Dashboard

            </button>

          </li>

          <li>

            <button
              className="nav-link-btn"
              onClick={() => navigate("/change-password")}
            >

              Change Password

            </button>

          </li>

        </ul>

        <div className="dash-navbar__right">

          <div className="dash-navbar__user">

            DR

          </div>

          <button
            className="dash-logout"
            onClick={handleLogout}
          >

            Logout

          </button>

        </div>

      </nav>

      <main className="dash-body">

        <section className="dash-welcome">

          <h1>

            Doctor Dashboard

          </h1>

          <p>

            Manage appointments and update their status.

          </p>

        </section>

        <div className="stat-cards">

          <div className="stat-card">

            <FaUserMd className="stat-icon" />

            <div className="stat-card__value">

              {appointments.length}

            </div>

            <div className="stat-card__label">

              Total Appointments

            </div>

          </div>

          <div className="stat-card">

            <FaClock className="stat-icon" />

            <div className="stat-card__value">

              {pendingCount}

            </div>

            <div className="stat-card__label">

              Pending

            </div>

          </div>

          <div className="stat-card">

            <FaCheckCircle className="stat-icon" />

            <div className="stat-card__value">

              {confirmedCount}

            </div>

            <div className="stat-card__label">

              Confirmed

            </div>

          </div>

        </div>

        <h2 className="dash-section-title">

          Today's Appointments

        </h2>

        {loading && (

          <div className="dash-loading">

            Loading appointments...

          </div>

        )}

        {error && (

          <div className="dash-error">

            {error}

          </div>

        )}

        {!loading && !error && (

          <div className="doctor-layout">

            <div className="appointment-list">

              {appointments.length === 0 ? (

                <div className="dash-loading">

                  No appointments found.

                </div>

              ) : (

                appointments.map((appointment) => (

                  <div
                    key={appointment.id}
                    className="appointment-row"
                  >

                    <div className="appointment-row__main">

                      <h3>

                        <FaUser style={{ marginRight: "8px" }} />

                        {appointment.patient_name}

                      </h3>

                      <p>

                        <FaCalendarAlt
                          style={{ marginRight: "8px" }}
                        />

                        {formatDate(appointment.appointment_date)}

                      </p>

                      <p>

                        <FaClock
                          style={{ marginRight: "8px" }}
                        />

                        {formatTime(appointment.appointment_time)}

                      </p>

                      {appointment.reason && (

                        <p className="appointment-reason">

                          <MdOutlineMedicalServices
                            style={{ marginRight: "8px" }}
                          />

                          {appointment.reason}

                        </p>

                      )}

                    </div>
                    <div className="appointment-row__meta">

                      <span
                        className={`status-badge ${getStatusClass(
                          appointment.status
                        )}`}
                      >

                        {appointment.status}

                      </span>

                      <select

                        value={
                          statusChanges[appointment.id] ??
                          appointment.status
                        }

                        onChange={(e) =>
                          handleStatusChange(
                            appointment.id,
                            e.target.value
                          )
                        }

                      >

                        <option value="Pending">

                          Pending

                        </option>

                        <option value="Confirmed">

                          Confirmed

                        </option>

                        <option value="Cancelled">

                          Cancelled

                        </option>

                        <option value="Completed">

                          Completed

                        </option>

                      </select>
                      <div className="appointment-actions">

                        <button
                          className="btn-save"
                          onClick={() => handleSaveStatus(appointment.id)}
                        >
                          <FaSave style={{ marginRight: "6px" }} />
                          Save
                        </button>

                        <button
                          className="btn-view"
                          onClick={() => handleViewDetails(appointment)}
                        >
                          <HiOutlineDocumentText style={{ marginRight: "6px" }} />

                          {openAppointmentId === appointment.id
                            ? "Hide Details"
                            : "View Details"}
                        </button>

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>
            {selectedPatient && (

              <aside className="patient-detail-panel">

                <h3 className="detail-panel__title">

                  Patient Details

                </h3>

                <div className="detail-field">

                  <span className="detail-field__label">

                    Name

                  </span>

                  <span className="detail-field__value">

                    {selectedPatient.full_name}

                  </span>

                </div>

                <div className="detail-field">

                  <span className="detail-field__label">

                    Email

                  </span>

                  <span className="detail-field__value">

                    {selectedPatient.email}

                  </span>

                </div>

                <div className="detail-field">

                  <span className="detail-field__label">

                    Phone

                  </span>

                  <span className="detail-field__value">

                    {selectedPatient.phone}

                  </span>

                </div>

                <div className="detail-field">

                  <span className="detail-field__label">

                    Appointment Date

                  </span>

                  <span className="detail-field__value">

                    {formatDate(selectedPatient.appointment_date)}

                  </span>

                </div>

                <div className="detail-field">

                  <span className="detail-field__label">

                    Appointment Time

                  </span>

                  <span className="detail-field__value">

                    {formatTime(selectedPatient.appointment_time)}

                  </span>

                </div>

                <div className="detail-field detail-field--notes">

                  <span className="detail-field__label">

                    Reason for Appointment

                  </span>

                  <p
                    className="detail-field__notes"
                    style={{
                      marginTop: "8px",
                      lineHeight: "1.6"
                    }}
                  >

                    {selectedPatient.reason || "No reason provided."}

                  </p>

                </div>

              </aside>

            )}

          </div>

        )}

      </main>

    </div>

  );

}

export default DoctorDashboard;