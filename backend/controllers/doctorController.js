const doctorModel = require("../models/doctorModel");
const db = require("../config/db");
const bcrypt = require("bcrypt");

// ================= GET ALL DOCTORS =================

const getDoctors = (req, res) => {

    doctorModel.getAllDoctors((err, doctors) => {

        if (err) {

            console.log(err);

            return res.json({
                success: false,
                message: "Unable to fetch doctors"
            });

        }

        return res.json({
            success: true,
            doctors
        });

    });

};
// ================= GET DOCTOR BY ID =================

const getDoctorById = (req, res) => {

    doctorModel.getDoctorById(req.params.id, (err, result) => {

        if (err) {

            console.log(err);

            return res.json({
                success: false,
                message: "Unable to fetch doctor"
            });

        }

        if (result.length === 0) {

            return res.json({
                success: false,
                message: "Doctor not found"
            });

        }

        return res.json({
            success: true,
            doctor: result[0]
        });

    });

};
// ================= GET DASHBOARD STATS =================

const getDashboardStats = (req, res) => {

    doctorModel.getDashboardStats((err, result) => {

        if (err) {

            console.log(err);

            return res.json({
                success: false,
                message: "Unable to fetch dashboard statistics"
            });

        }

        return res.json({
            success: true,
            stats: {
                activeDoctors: result[0].activeDoctors,
                appointmentsThisMonth: result[0].appointmentsThisMonth,
                slotUtilization: `${result[0].slotUtilization}%`
            }
        });

    });

};

// ================= ADD DOCTOR =================

const addDoctor = async (req, res) => {

    try {

        const {
            full_name,
            email,
            phone,
            password,
            specialization,
            available_time
        } = req.body;

        if (
            !full_name ||
            !email ||
            !phone ||
            !password ||
            !specialization ||
            !available_time
        ) {

            return res.json({
                success: false,
                message: "All fields are required"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userQuery = `
            INSERT INTO users
            (full_name,email,password,phone,role)
            VALUES(?,?,?,?,?)
        `;

        db.query(
            userQuery,
            [
                full_name,
                email,
                hashedPassword,
                phone,
                "Doctor"
            ],
            (userErr) => {

                if (userErr) {

                    console.log(userErr);

                    if (userErr.code === "ER_DUP_ENTRY") {

                        return res.json({
                            success: false,
                            message: "Email already exists"
                        });

                    }

                    return res.json({
                        success: false,
                        message: "Unable to create doctor account"
                    });

                }

                doctorModel.addDoctor(
                    {
                        doctor_name: full_name,
                        email,
                        specialization,
                        available_time
                    },
                    (doctorErr) => {

                        if (doctorErr) {

                            console.log(doctorErr);

                            return res.json({
                                success: false,
                                message: "Doctor profile creation failed"
                            });

                        }

                        return res.json({
                            success: true,
                            message: "Doctor added successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: "Something went wrong"
        });

    }

};

// ================= UPDATE DOCTOR =================

const updateDoctor = (req, res) => {

    const { id } = req.params;

    const {
        full_name,
        email,
        specialization,
        available_time
    } = req.body;

    doctorModel.getDoctorById(id, (err, result) => {

        if (err || result.length === 0) {

            return res.json({
                success: false,
                message: "Doctor not found"
            });

        }

        const oldEmail = result[0].email;

        doctorModel.updateDoctor(
            id,
            {
                doctor_name: full_name,
                email,
                specialization,
                available_time
            },
            (doctorErr) => {

                if (doctorErr) {

                    console.log(doctorErr);

                    return res.json({
                        success: false,
                        message: "Unable to update doctor"
                    });

                }

                db.query(
                    `
                    UPDATE users
                    SET full_name=?, email=?
                    WHERE email=?
                    `,
                    [
                        full_name,
                        email,
                        oldEmail
                    ],
                    (userErr) => {

                        if (userErr) {

                            console.log(userErr);

                            return res.json({
                                success: false,
                                message: "Doctor updated but user update failed"
                            });

                        }

                        return res.json({
                            success: true,
                            message: "Doctor updated successfully"
                        });

                    }
                );

            }
        );

    });

};

// ================= DELETE DOCTOR =================

const deleteDoctor = (req, res) => {

    const { id } = req.params;

    doctorModel.getDoctorById(id, (err, result) => {

        if (err || result.length === 0) {

            return res.json({
                success: false,
                message: "Doctor not found"
            });

        }

        const email = result[0].email;

        doctorModel.deleteDoctor(id, (doctorErr) => {

            if (doctorErr) {

                console.log(doctorErr);

                return res.json({
                    success: false,
                    message: "Unable to delete doctor"
                });

            }

            db.query(
                "DELETE FROM users WHERE email=?",
                [email],
                (userErr) => {

                    if (userErr) {

                        console.log(userErr);

                        return res.json({
                            success: false,
                            message: "Doctor deleted but user delete failed"
                        });

                    }

                    return res.json({
                        success: true,
                        message: "Doctor deleted successfully"
                    });

                }
            );

        });

    });

};

module.exports = {
    getDoctors,
    getDoctorById,
    getDashboardStats,
    addDoctor,
    updateDoctor,
    deleteDoctor
};