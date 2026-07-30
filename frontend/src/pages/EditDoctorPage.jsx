import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import "./BookAppointment.css";

function EditDoctorPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({

        full_name: "",

        email: "",

        specialization: "",

        available_time: ""

    });

    useEffect(() => {

        loadDoctor();

    }, []);

    async function loadDoctor() {

        try {

            const response = await fetch(

                `http://localhost:5000/api/doctors/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            const data = await response.json();

            if (!data.success) {

                throw new Error(data.message);

            }

            setForm({

                full_name: data.doctor.doctor_name,

                email: data.doctor.email,

                specialization: data.doctor.specialization,

                available_time: data.doctor.available_time

            });

        }

        catch (error) {

            toast.error(error.message);

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }
        async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);

            const response = await fetch(

                `http://localhost:5000/api/doctors/${id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${localStorage.getItem("token")}`

                    },

                    body: JSON.stringify(form)

                }

            );

            const data = await response.json();

            if (!data.success) {

                throw new Error(data.message);

            }

            toast.success("Doctor updated successfully.");

            navigate("/admin/dashboard");

        }

        catch (error) {

            toast.error(error.message);

        }

        finally {

            setSaving(false);

        }

    }

    if (loading) {

        return (

            <div className="book-page">

                <h2 style={{ textAlign: "center", marginTop: "60px" }}>

                    Loading...

                </h2>

            </div>

        );

    }

    return (

        <div className="book-page">

            <div className="book-container">

                <div className="book-header">

                    <h1>Edit Doctor</h1>

                    <p>

                        Update doctor information.

                    </p>

                </div>

                <form
                    className="booking-card"
                    onSubmit={handleSubmit}
                >

                    <div className="booking-grid">

                        <div className="booking-field">

                            <label>Full Name</label>

                            <input
                                type="text"
                                name="full_name"
                                value={form.full_name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="booking-field">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="booking-grid">

                        <div className="booking-field">

                            <label>Specialization</label>

                            <input
                                type="text"
                                name="specialization"
                                value={form.specialization}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="booking-field">

                            <label>Available Time</label>

                            <input
                                type="text"
                                name="available_time"
                                value={form.available_time}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="booking-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/admin/dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="book-btn"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
    }

export default EditDoctorPage;