const db = require("../config/db");

// ====================== GET REPORT STATISTICS ======================

const getDashboardReport = (callback) => {

    const query = `
        SELECT
            (SELECT COUNT(*) FROM doctors) AS totalDoctors,
            (SELECT COUNT(*) FROM users WHERE role='patient') AS totalPatients,
            (SELECT COUNT(*) FROM appointments) AS totalAppointments,
            (SELECT COUNT(*) FROM appointments WHERE status='Pending') AS pendingAppointments,
            (SELECT COUNT(*) FROM appointments WHERE status='Confirmed') AS confirmedAppointments,
            (SELECT COUNT(*) FROM appointments WHERE status='Cancelled') AS cancelledAppointments
    `;

    db.query(query, callback);

};

module.exports = {
    getDashboardReport
};