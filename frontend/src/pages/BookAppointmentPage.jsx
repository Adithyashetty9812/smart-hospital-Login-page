import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import toast from "react-hot-toast";

import { getDoctors } from "../services/patientDoctorService";

import { bookAppointment } from "../services/appointmentService";

import "./BookAppointment.css";

function BookAppointmentPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedDoctor, setSelectedDoctor] =
    useState("");

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [appointmentTime, setAppointmentTime] =
    useState("");
  const [reason, setReason] =
    useState("");

  const today =
    new Date().toISOString().split("T")[0];

  useEffect(() => {

    loadDoctors();

  }, []);

  async function loadDoctors() {

    try {

      setLoading(true);

      const data =
        await getDoctors();

      setDoctors(data);

      const specialization =
        location.state?.specialization;

      if (specialization) {

        const matchedDoctor = data.find(
          (doctor) =>
            doctor.specialization.toLowerCase() ===
            specialization.toLowerCase()
        );

        if (matchedDoctor) {
          setSelectedDoctor(matchedDoctor.doctor_name);
        }

      }

      setError("");

    }

    catch {

      setError(
        "Unable to load doctors."
      );

    }

    finally {

      setLoading(false);

    }

  }

  const doctor =
    useMemo(

      () =>
        doctors.find(

          (d) =>
            d.doctor_name ===
            selectedDoctor

        ),

      [selectedDoctor, doctors]

    );

  async function handleBook(e) {

    e.preventDefault();

    if (

      !selectedDoctor ||

      !appointmentDate ||

      !appointmentTime ||

      !reason.trim()

    ) {

      toast.error(

        "Please fill all fields."

      );

      return;

    }

    if (

      appointmentDate < today

    ) {

      toast.error(

        "Past dates are not allowed."

      );

      return;

    }

    const now = new Date();

    const currentTime =

      now.getHours()

        .toString()

        .padStart(2, "0")

      +

      ":"

      +

      now.getMinutes()

        .toString()

        .padStart(2, "0");

    if (

      appointmentDate === today &&

      appointmentTime < currentTime

    ) {

      toast.error(

        "Choose a future time."

      );

      return;

    }

    try {

      await bookAppointment({

        doctor_name:
          selectedDoctor,

        appointment_date:
          appointmentDate,

        appointment_time:
          appointmentTime,

        reason

      });

      toast.success(

        "Appointment Booked!"

      );

      navigate(

        "/patient/dashboard"

      );

    }

    catch {

      toast.error(

        "Unable to book appointment."

      );

    }

  }

  return (

    <div className="book-page">

      <div className="book-container">
        <div className="book-header">

          <h1>

            Book an Appointment

          </h1>

          <p>

            Choose your preferred doctor,
            select a convenient date and time,
            and confirm your appointment.

          </p>

        </div>

        {loading && (

          <div className="booking-message">

            Loading doctors...

          </div>

        )}

        {error && (

          <div className="booking-message booking-error">

            {error}

          </div>

        )}

        {!loading && !error && (

          <form
            className="booking-card"
            onSubmit={handleBook}
          >

            <div className="booking-grid">

              <div className="booking-field">

                <label>

                  Select Doctor

                </label>

                <select

                  value={selectedDoctor}

                  onChange={(e) =>
                    setSelectedDoctor(
                      e.target.value
                    )
                  }

                >

                  <option value="">

                    -- Choose Doctor --

                  </option>

                  {doctors.map((doctor) => (

                    <option
                      key={doctor.id}
                      value={doctor.doctor_name}
                    >

                      {doctor.doctor_name}

                    </option>

                  ))}

                </select>

              </div>

            </div>

            {doctor && (

              <div className="doctor-card">

                <h2>

                  {doctor.doctor_name}

                </h2>

                <div className="doctor-info">

                  <p>

                    <strong>

                      Specialization:

                    </strong>

                    {" "}

                    {doctor.specialization}

                  </p>

                  <p>

                    <strong>

                      Experience:

                    </strong>

                    {" "}

                    {doctor.experience} Years

                  </p>

                  <p>

                    <strong>

                      Consultation Fee:

                    </strong>

                    {" "}

                    ₹{doctor.consultation_fee}

                  </p>

                  <p>

                    <strong>

                      Available Days:

                    </strong>

                    {" "}

                    {doctor.available_days}

                  </p>

                  <p>

                    <strong>

                      Available Time:

                    </strong>

                    {" "}

                    {doctor.available_time}

                  </p>

                </div>

              </div>

            )}
            <div className="booking-grid">

              <div className="booking-field">

                <label>

                  Appointment Date

                </label>

                <input

                  type="date"

                  min={today}

                  value={appointmentDate}

                  onChange={(e) =>
                    setAppointmentDate(
                      e.target.value
                    )
                  }

                />

              </div>

              <div className="booking-field">

                <label>

                  Appointment Time

                </label>

                <input

                  type="time"

                  value={appointmentTime}

                  onChange={(e) =>
                    setAppointmentTime(
                      e.target.value
                    )
                  }

                />

              </div>

            </div>
            <div className="booking-field">

              <label>

                Reason for Appointment

              </label>

              <textarea

                rows="4"

                placeholder="Describe your symptoms or reason for visiting the doctor..."

                value={reason}

                onChange={(e) =>
                  setReason(e.target.value)
                }

                style={{
                  resize: "vertical"
                }}

              />

            </div>
            <div className="booking-actions">

              <button

                type="button"

                className="cancel-btn"

                onClick={() =>
                  navigate("/patient/dashboard")
                }

              >

                Cancel

              </button>

              <button

                type="submit"

                className="book-btn"

              >

                Book Appointment

              </button>

            </div>

          </form>

        )}

      </div>

    </div>

  );

}

export default BookAppointmentPage;
