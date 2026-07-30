const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    bookAppointment,
    getAppointments,
    cancelAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
} = require("../controllers/appointmentController");

// ====================== PATIENT ROUTES ======================

// Book Appointment
router.post("/", authMiddleware, bookAppointment);

// View My Appointments
router.get("/", authMiddleware, getAppointments);

// Cancel My Appointment
router.put("/:id", authMiddleware, cancelAppointment);

// ====================== ADMIN ROUTES ======================

// Get All Appointments
router.get("/admin/all", authMiddleware, getAllAppointments);

// Update Appointment Status
router.put("/admin/status/:id", authMiddleware, updateAppointmentStatus);

// Delete Appointment
router.delete("/admin/:id", authMiddleware, deleteAppointment);

module.exports = router;