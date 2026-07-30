import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaEdit,
  FaTrash,
  FaStethoscope,
  FaBriefcase
} from "react-icons/fa";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAdminDashboard,
  removeDoctor
} from "../services/adminService";

import { logoutUser } from "../services/authService";

import "./Dashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      setLoading(true);

      const data = await getAdminDashboard();

      setDashboard(data);

      setError("");

    }

    catch {

      setError("Unable to load dashboard.");

      toast.error("Unable to load dashboard.");

    }

    finally {

      setLoading(false);

    }

  }

  async function handleDelete(id) {

    if (!window.confirm("Delete this doctor?")) return;

    try {

      await removeDoctor(id);

      toast.success("Doctor removed.");

      loadDashboard();

    }

    catch {

      toast.error("Unable to delete doctor.");

    }

  }

  function handleLogout() {

    logoutUser();

    navigate("/login");

  }

  const totalDoctors = useMemo(() => {

    return dashboard?.doctors?.length || 0;

  }, [dashboard]);
  return (

    <div className="dash-page">

        <nav className="dash-navbar">

            <div className="dash-navbar__brand">

                MediCare+

            </div>

            <ul className="dash-navbar__links">

                <li>

                    <button
                        className="nav-link-btn active"
                    >

                        Dashboard

                    </button>

                </li>

                <li>

                    <button
                        className="nav-link-btn"
                        onClick={() =>
                            navigate("/admin/appointments")
                        }
                    >

                        Appointments

                    </button>

                </li>

                <li>

                    <button
                        className="nav-link-btn"
                        onClick={() =>
                            navigate("/admin/reports")
                        }
                    >

                        Reports

                    </button>

                </li>

            </ul>

            <div className="dash-navbar__right">

                <div className="dash-navbar__user">

                    AD

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

                    Administrator Dashboard

                </h1>

                <p>

                    Manage doctors, monitor hospital statistics and maintain the system.

                </p>

            </section>

            <div className="stat-cards">

                <div className="stat-card">

                    <FaUserMd className="stat-icon" />

                    <div className="stat-card__value">

                        {totalDoctors}

                    </div>

                    <div className="stat-card__label">

                        Registered Doctors

                    </div>

                </div>

                <div className="stat-card">

                    <FaUsers className="stat-icon" />

                    <div className="stat-card__value">

                        {dashboard?.stats?.patients ?? 0}

                    </div>

                    <div className="stat-card__label">

                        Total Patients

                    </div>

                </div>

                <div className="stat-card">

                    <FaCalendarCheck className="stat-icon" />

                    <div className="stat-card__value">

                        {dashboard?.stats?.appointments ?? 0}

                    </div>

                    <div className="stat-card__label">

                        Appointments

                    </div>

                </div>

            </div>

            <h2 className="dash-section-title">

                Doctor Management

            </h2>
            {loading && (

    <div className="dash-loading">

        Loading...

    </div>

)}

{error && (

    <div className="dash-error">

        {error}

    </div>

)}

{!loading && !error && (

    <div className="appointment-list">

        <div
            className="admin-actions"
        >

            <button
                className="dash-primary-btn"
                onClick={() =>
                    navigate("/admin/doctors/add")
                }
            >

                ➕ Add Doctor

            </button>

            <button
                className="dash-primary-btn"
                onClick={() =>
                    navigate("/admin/appointments")
                }
            >

                📅 Manage Appointments

            </button>

        </div>

        {dashboard?.doctors?.length === 0 ? (

            <div className="dash-loading">

                No doctors found.

            </div>

        ) : (

            dashboard.doctors.map((doctor) => (

                <div
                    className="appointment-row"
                    key={doctor.id}
                >

                    <div className="appointment-row__main">

                        <h3 className="doctor-name">

                            <FaUserMd
                                style={{ marginRight: "10px" }}
                            />

                            {doctor.doctor_name}

                        </h3>

                        <p className="doctor-specialization">

                            <FaStethoscope
                                style={{ marginRight: "8px" }}
                            />

                            {doctor.specialization}

                        </p>

                        <p className="doctor-exp">

                            <FaBriefcase
                                style={{ marginRight: "8px" }}
                            />

                            {doctor.experience} Years Experience

                        </p>

                    </div>

                    <div className="appointment-row__meta">

                        <button
                            className="btn-view"
                            onClick={() =>
                                navigate(
                                    `/admin/doctors/edit/${doctor.id}`
                                )
                            }
                        >

                            <FaEdit
                                style={{ marginRight: "6px" }}
                            />

                            Edit

                        </button>

                        <button
                            className="btn-danger"
                            onClick={() =>
                                handleDelete(doctor.id)
                            }
                        >

                            <FaTrash
                                style={{ marginRight: "6px" }}
                            />

                            Delete

                        </button>

                    </div>

                </div>

            ))

        )}

    </div>

)}
        </main>

    </div>

);

}

export default AdminDashboard;