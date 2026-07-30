const db = require("../config/db");

// ================= Get Patient Appointments =================

const getPatientAppointments = (patientId, callback) => {

    const query = `
        SELECT
            doctor_name,
            appointment_date,
            appointment_time,
            status
        FROM appointments
        WHERE patient_id = ?
        ORDER BY appointment_date ASC,
                 appointment_time ASC
    `;

    db.query(query, [patientId], callback);

};

// ================= Get Next Appointment =================

const getNextAppointment = (patientId, callback) => {

    const query = `
        SELECT
            doctor_name,
            appointment_date,
            appointment_time,
            status
        FROM appointments
        WHERE patient_id = ?
        ORDER BY appointment_date ASC,
                 appointment_time ASC
        LIMIT 1
    `;

    db.query(query, [patientId], callback);

};

// ================= Get Doctors By Specialization =================

const getDoctorsBySpecialization = (specialization, callback) => {

    const query = `
        SELECT
            doctor_name,
            specialization,
            available_time
        FROM doctors
        WHERE specialization = ?
        ORDER BY doctor_name
    `;

    db.query(query, [specialization], callback);

};

module.exports = {

    getPatientAppointments,

    getNextAppointment,

    getDoctorsBySpecialization

};