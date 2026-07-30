const db = require("../config/db");

// ==================== GET ALL DOCTORS ====================

const getAllDoctors = (callback) => {

    const query = `
        SELECT *
        FROM doctors
        ORDER BY doctor_name
    `;

    db.query(query, callback);

};

// ==================== GET DOCTOR BY ID ====================

const getDoctorById = (id, callback) => {

    const query = `
        SELECT *
        FROM doctors
        WHERE id = ?
    `;

    db.query(query, [id], callback);

};

// ==================== ADD DOCTOR ====================

const addDoctor = (doctor, callback) => {

    const query = `
        INSERT INTO doctors
        (
            doctor_name,
            email,
            specialization,
            available_time
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            doctor.doctor_name,
            doctor.email,
            doctor.specialization,
            doctor.available_time
        ],
        callback
    );

};

// ==================== UPDATE DOCTOR ====================

const updateDoctor = (id, doctor, callback) => {

    const query = `
        UPDATE doctors
        SET
            doctor_name=?,
            email=?,
            specialization=?,
            available_time=?
        WHERE id=?
    `;

    db.query(
        query,
        [
            doctor.doctor_name,
            doctor.email,
            doctor.specialization,
            doctor.available_time,
            id
        ],
        callback
    );

};

// ==================== DELETE DOCTOR ====================

const deleteDoctor = (id, callback) => {

    const query = `
        DELETE FROM doctors
        WHERE id=?
    `;

    db.query(query, [id], callback);

};

// ==================== DASHBOARD STATS ====================

const getDashboardStats = (callback) => {

    const query = `

        SELECT

        (SELECT COUNT(*) FROM doctors) AS activeDoctors,

        (

            SELECT COUNT(*)

            FROM appointments

            WHERE MONTH(appointment_date)=MONTH(CURDATE())

            AND YEAR(appointment_date)=YEAR(CURDATE())

        ) AS appointmentsThisMonth,

        (

            SELECT ROUND(

                (

                    SELECT COUNT(*)

                    FROM appointments

                    WHERE status='Confirmed'

                ) * 100 /

                GREATEST(

                    (SELECT COUNT(*) FROM appointments),

                    1

                )

            )

        ) AS slotUtilization

    `;

    db.query(query, callback);

};

module.exports = {

    getAllDoctors,

    getDoctorById,

    addDoctor,

    updateDoctor,

    deleteDoctor,

    getDashboardStats

};