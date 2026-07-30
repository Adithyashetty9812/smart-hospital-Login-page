const db = require("../config/db");

// ====================== BOOK APPOINTMENT ======================

const createAppointment = (data, callback) => {

    const query = `
    INSERT INTO appointments
    (
        patient_id,
        doctor_name,
        appointment_date,
        appointment_time,
        reason
    )
    VALUES (?, ?, ?, ?, ?)
`;

    db.query(
        query,
        [
            data.patient_id,
            data.doctor_name,
            data.appointment_date,
            data.appointment_time,
            data.reason
        ],
        callback
    );

};

// ====================== PATIENT APPOINTMENTS ======================

const getAppointmentsByPatient = (patientId, callback) => {

    const query = `
        SELECT *
        FROM appointments
        WHERE patient_id = ?
        ORDER BY appointment_date, appointment_time
    `;

    db.query(query, [patientId], callback);

};

// ====================== CANCEL APPOINTMENT ======================

const cancelAppointment = (appointmentId, callback) => {

    const query = `
        UPDATE appointments
        SET status='Cancelled'
        WHERE id=?
    `;

    db.query(query, [appointmentId], callback);

};

// ====================== ADMIN - GET ALL APPOINTMENTS ======================

const getAllAppointments = (callback) => {

    const query = `
        SELECT
            appointments.id,
            users.full_name AS patient_name,
            appointments.doctor_name,
            appointments.appointment_date,
            appointments.appointment_time,
            appointments.status
        FROM appointments

        INNER JOIN users
        ON appointments.patient_id = users.id

        ORDER BY
        appointments.appointment_date DESC,
        appointments.appointment_time DESC
    `;

    db.query(query, callback);

};

// ====================== ADMIN - UPDATE STATUS ======================

const updateAppointmentStatus = (id, status, callback) => {

    const query = `
        UPDATE appointments
        SET status=?
        WHERE id=?
    `;

    db.query(query, [status, id], callback);

};

// ====================== ADMIN - DELETE APPOINTMENT ======================

const deleteAppointment = (id, callback) => {

    const query = `
        DELETE FROM appointments
        WHERE id=?
    `;

    db.query(query, [id], callback);

};

module.exports = {

    createAppointment,

    getAppointmentsByPatient,

    cancelAppointment,

    getAllAppointments,

    updateAppointmentStatus,

    deleteAppointment

};