import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
} from "../services/appointmentService";

import "./Dashboard.css";
import "./AppointmentManagement.css";

function AppointmentManagement() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        loadAppointments();

    }, []);

    async function loadAppointments() {

        try {

            const data = await getAllAppointments();

            setAppointments(data);

        } catch (err) {

            setError("Unable to load appointments.");

        } finally {

            setLoading(false);

        }

    }

    async function handleStatusChange(id, status) {

        try {

            await updateAppointmentStatus(id, status);

            setSuccessMessage("Appointment updated successfully.");

            loadAppointments();

            setTimeout(() => {

                setSuccessMessage("");

            }, 3000);

        } catch {

            alert("Unable to update appointment.");

        }

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this appointment?")) {

            return;

        }

        try {

            await deleteAppointment(id);

            setSuccessMessage("Appointment deleted successfully.");

            loadAppointments();

            setTimeout(() => {

                setSuccessMessage("");

            }, 3000);

        } catch {

            alert("Unable to delete appointment.");

        }

    }

    const filteredAppointments = appointments.filter((appointment) => {

        const search = searchTerm.toLowerCase();

        return (

            appointment.patient_name.toLowerCase().includes(search) ||

            appointment.doctor_name.toLowerCase().includes(search) ||

            appointment.status.toLowerCase().includes(search)

        );

    });

    return (

        <div className="dash-page">

            <nav className="dash-navbar">

                <span className="dash-navbar__brand">
                    MediCare+
                </span>

                <ul className="dash-navbar__links">

                    <li>

                        <button
                            className="nav-link-btn"
                            onClick={() => navigate("/admin/dashboard")}
                        >
                            Doctors
                        </button>

                    </li>

                    <li>

                        <button
                            className="nav-link-btn active"
                            onClick={() => navigate("/admin/appointments")}
                        >
                            Appointments
                        </button>

                    </li>

                    <li>

                        <button
                            className="nav-link-btn"
                            onClick={() => navigate("/admin/reports")}
                        >
                            Reports
                        </button>

                    </li>

                </ul>

                <div className="dash-navbar__right">

                    <div className="dash-navbar__user">
                        A
                    </div>

                    <button
                        className="dash-logout"
                        onClick={() => {

                            localStorage.removeItem("token");
                            localStorage.removeItem("user");

                            navigate("/login");

                        }}
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <div className="dash-body">

                <section className="dash-welcome">

                    <h1>
                        Appointment Management
                    </h1>

                    <p>
                        Manage, search and update hospital appointments.
                    </p>

                </section>

                {loading && (
                    <p>Loading...</p>
                )}

                {error && (
                    <div className="dash-error">
                        {error}
                    </div>
                )}

                {successMessage && (

                    <div className="success-message">

                        {successMessage}

                    </div>

                )}

                <div className="appointment-toolbar">

                    <input

                        className="appointment-search"

                        placeholder="Search patient, doctor or status..."

                        value={searchTerm}

                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }

                    />

                </div>
                <div className="appointment-table">

                    <div className="appointment-table__header">

                        <span>Patient</span>

                        <span>Doctor</span>

                        <span>Date</span>

                        <span>Time</span>

                        <span>Status</span>

                        <span>Actions</span>

                    </div>

                    {filteredAppointments.length === 0 ? (

                        <div className="appointment-empty">

                            No appointments found.

                        </div>

                    ) : (

                        filteredAppointments.map((appointment) => (

                            <div
                                className="appointment-table__row"
                                key={appointment.id}
                            >

                                <span>

                                    {appointment.patient_name}

                                </span>

                                <span>

                                    {appointment.doctor_name}

                                </span>
                                <span>

                                    {new Date(appointment.appointment_date).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )}

                                </span>
                                <span>

                                    {new Date(
                                        `1970-01-01T${appointment.appointment_time}`
                                    ).toLocaleTimeString("en-IN", {

                                        hour: "numeric",

                                        minute: "2-digit"

                                    })}

                                </span>

                                <span>

                                    <select

                                        className="status-select"

                                        value={appointment.status}

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

                                </span>

                                <span className="appointment-actions">

                                    <button
                                        className="btn-view"
                                        onClick={() =>
                                            alert(
                                                `Patient: ${appointment.patient_name}

Doctor: ${appointment.doctor_name}

Status: ${appointment.status}`
                                            )
                                        }
                                    >
                                        View
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                appointment.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </span>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

}

export default AppointmentManagement;