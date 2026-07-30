require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const profileRoutes = require("./routes/profileRoutes");
const doctorDashboardRoutes = require("./routes/doctorDashboardRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const aiRoutes = require("./routes/aiRoutes");

const PORT = 5000;

// ================= Middleware =================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

// ================= API Routes =================

app.use("/api/auth", authRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/profile", profileRoutes);

// Doctor Dashboard
app.use("/api/doctor-dashboard", doctorDashboardRoutes);

// Admin Dashboard
app.use("/api/admin-dashboard", adminDashboardRoutes);

// 🤖 AI Assistant
app.use("/api/ai", aiRoutes);

// ================= Home =================

app.get("/", (req, res) => {
    res.send("Smart Hospital Backend is Running!");
});

// ================= Server =================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});