const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    loginUser,
    registerUser,
    changePassword
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Change Password
router.put(
    "/change-password",
    authMiddleware,
    changePassword
);

module.exports = router;