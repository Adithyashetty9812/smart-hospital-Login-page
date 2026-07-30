import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { addDoctor } from "../services/adminService";

import "./BookAppointment.css";

function AddDoctorPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        full_name: "",

        email: "",

        phone: "",

        password: "",

        specialization: "",

        available_time: ""

    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (

            !form.full_name ||

            !form.email ||

            !form.phone ||

            !form.password ||

            !form.specialization ||

            !form.available_time

        ) {

            toast.error("Please fill all fields.");

            return;

        }

        try {

            setLoading(true);

            await addDoctor(form);

            toast.success("Doctor added successfully.");

            navigate("/admin/dashboard");

        }

        catch (error) {

            toast.error(error.message);

        }

        finally {

    setLoading(false);

}

}

return (

        <div className="book-page">

            <div className="book-container">

                <div className="book-header">

                    <h1>Add Doctor</h1>

                    <p>
                        Register a new doctor in the hospital management system.
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

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="booking-field">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
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
                                placeholder="e.g. Cardiologist"
                                value={form.specialization}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="booking-field">

                            <label>Available Time</label>

                            <input
                                type="text"
                                name="available_time"
                                placeholder="10:00 AM - 4:00 PM"
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
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Adding..."
                                    : "Add Doctor"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
    }
    

export default AddDoctorPage;