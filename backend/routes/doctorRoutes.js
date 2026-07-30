const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDoctors,
    getDoctorById,
    getDashboardStats,
    addDoctor,
    updateDoctor,
    deleteDoctor
} = require("../controllers/doctorController");

// ================= DASHBOARD STATS =================

router.get("/stats", authMiddleware, getDashboardStats);

// ================= DOCTORS =================

router.get("/", authMiddleware, getDoctors);
router.get("/:id", authMiddleware, getDoctorById);
router.post("/", authMiddleware, addDoctor);

router.put("/:id", authMiddleware, updateDoctor);

router.delete("/:id", authMiddleware, deleteDoctor);

module.exports = router;