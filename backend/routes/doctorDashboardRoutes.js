const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDoctorAppointments,
    confirmAppointment,
    cancelAppointment,
    getPatientDetails,
    updateAppointmentStatus
} = require("../controllers/doctorDashboardController");

// Get all appointments for logged-in doctor
router.get(
    "/appointments",
    authMiddleware,
    getDoctorAppointments
);

// Confirm appointment
router.put(
    "/appointments/:id/confirm",
    authMiddleware,
    confirmAppointment
);

// Cancel appointment
router.put(
    "/appointments/:id/cancel",
    authMiddleware,
    cancelAppointment
);
// ================= GET PATIENT DETAILS =================

router.get(
    "/appointments/:id",
    authMiddleware,
    getPatientDetails
);

// ================= UPDATE STATUS =================

router.put(
    "/appointments/:id/status",
    authMiddleware,
    updateAppointmentStatus
);

module.exports = router;