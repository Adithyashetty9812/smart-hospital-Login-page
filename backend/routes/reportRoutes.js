const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDashboardReport
} = require("../controllers/reportController");

// ====================== REPORTS ======================

router.get("/", authMiddleware, getDashboardReport);

module.exports = router;