const db = require("../config/db");

const getDashboardStats = (callback) => {

    const query = `
        SELECT
            (SELECT COUNT(*) FROM users WHERE role='Patient') AS totalPatients,
            (SELECT COUNT(*) FROM users WHERE role='Doctor') AS totalDoctors,
            (SELECT COUNT(*) FROM appointments) AS totalAppointments
    `;

    db.query(query, callback);
};

module.exports = {
    getDashboardStats
};