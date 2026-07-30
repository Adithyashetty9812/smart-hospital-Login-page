const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDashboardStats
} = require("../controllers/adminDashboardController");

// Dashboard Statistics
router.get(
    "/stats",
    authMiddleware,
    getDashboardStats
);

module.exports = router;