import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboardReport } from "../services/reportService";

import "./Dashboard.css";
import "./Reports.css";

function ReportsPage() {

    const navigate = useNavigate();

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadReport();

    }, []);

    async function loadReport() {

        try {

            const data = await getDashboardReport();

            setReport(data);

        } catch {

            setError("Unable to load reports.");

        } finally {

            setLoading(false);

        }

    }

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
                        Hospital Reports
                    </h1>

                    <p>
                        View overall hospital statistics and system performance.
                    </p>

                </section>

                {loading && <p>Loading...</p>}

                {error && (
                    <div className="dash-error">
                        {error}
                    </div>
                )}

                {!loading && !error && report && (

                    <div className="report-grid">
                        <div className="report-card">

                            <h2>
                                {report.totalDoctors}
                            </h2>

                            <p>
                                Total Doctors
                            </p>

                        </div>

                        <div className="report-card">

                            <h2>
                                {report.totalPatients}
                            </h2>

                            <p>
                                Total Patients
                            </p>

                        </div>

                        <div className="report-card">

                            <h2>
                                {report.totalAppointments}
                            </h2>

                            <p>
                                Total Appointments
                            </p>

                        </div>

                        <div className="report-card">

                            <h2>
                                {report.pendingAppointments}
                            </h2>

                            <p>
                                Pending Appointments
                            </p>

                        </div>

                        <div className="report-card">

                            <h2>
                                {report.confirmedAppointments}
                            </h2>

                            <p>
                                Confirmed Appointments
                            </p>

                        </div>

                        <div className="report-card">

                            <h2>
                                {report.cancelledAppointments}
                            </h2>

                            <p>
                                Cancelled Appointments
                            </p>

                        </div>
                        <div className="report-actions">

                            <button
                                className="dash-primary-btn"
                                onClick={() => alert("PDF Export coming soon")}
                            >
                                Export PDF
                            </button>

                            <button
                                className="btn-view"
                                onClick={() => alert("Excel Export coming soon")}
                            >
                                Export Excel
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ReportsPage;