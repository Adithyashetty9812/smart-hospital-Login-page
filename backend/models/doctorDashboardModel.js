const db = require("../config/db");

// Get appointments for logged-in doctor
const getDoctorAppointments = (doctorName, callback) => {

    const query = `
        SELECT
            appointments.id,
            users.full_name AS patient_name,
            appointments.appointment_date,
            appointments.appointment_time,
            appointments.status
        FROM appointments
        INNER JOIN users
            ON appointments.patient_id = users.id
        WHERE appointments.doctor_name = ?
        ORDER BY appointments.appointment_date,
                 appointments.appointment_time
    `;

    db.query(query, [doctorName], callback);

};

// Confirm appointment
const confirmAppointment = (appointmentId, callback) => {

    const query = `
        UPDATE appointments
        SET status = 'Confirmed'
        WHERE id = ?
    `;

    db.query(query, [appointmentId], callback);
};

// Cancel appointment
const cancelAppointment = (appointmentId, callback) => {

    const query = `
        UPDATE appointments
        SET status = 'Cancelled'
        WHERE id = ?
    `;

    db.query(query, [appointmentId], callback);
};
// ================= GET PATIENT DETAILS =================

const getPatientDetails = (appointmentId, callback) => {

   const query = `
    SELECT
        appointments.id,
        users.full_name,
        users.email,
        users.phone,
        appointments.appointment_date,
        appointments.appointment_time,
        appointments.status,
        appointments.reason,
        appointments.doctor_name
    FROM appointments
    INNER JOIN users
        ON appointments.patient_id = users.id
    WHERE appointments.id = ?
`;

    db.query(query, [appointmentId], callback);

};

// ================= UPDATE STATUS =================

const updateAppointmentStatus = (
    appointmentId,
    status,
    callback
) => {

    const query = `
        UPDATE appointments
        SET status = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [status, appointmentId],
        callback
    );

};
module.exports = {
    getDoctorAppointments,
    confirmAppointment,
    cancelAppointment,
    getPatientDetails,
    updateAppointmentStatus
};