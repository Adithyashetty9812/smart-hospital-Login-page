const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ====================== REGISTER CONTROLLER ======================

const registerUser = async (req, res) => {
    try {

        const { full_name, email, password, phone, role } = req.body;

        // Validation
        if (!full_name || !email || !password || !phone || !role) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert Query
        const query = `
            INSERT INTO users (full_name, email, password, phone, role)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [full_name, email, hashedPassword, phone, role],
            (err, result) => {

                if (err) {

                    console.log(err);

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.json({
                            success: false,
                            message: "Email already exists"
                        });
                    }

                    return res.json({
                        success: false,
                        message: "Database Error"
                    });
                }

                return res.json({
                    success: true,
                    message: "User registered successfully"
                });

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

// ====================== LOGIN CONTROLLER ======================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Find User
        const query = `
            SELECT * FROM users
            WHERE email = ?
        `;

        db.query(query, [email], async (err, result) => {

            if (err) {
                console.log(err);

                return res.json({
                    success: false,
                    message: "Database Error"
                });
            }

            // User not found
            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "User not found"
                });
            }

            const user = result[0];

            // Compare Password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.json({
                    success: false,
                    message: "Invalid Password"
                });
            }

            // Generate Token
            const token = jwt.sign(
                {
                    id: user.id,
                    full_name: user.full_name,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.json({
                success: true,
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            });

        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: "Something went wrong"
        });

    }
};
// ====================== CHANGE PASSWORD ======================

const changePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {

            return res.json({
                success: false,
                message: "All fields are required"
            });

        }

        const query = `
            SELECT *
            FROM users
            WHERE id = ?
        `;

        db.query(query, [req.user.id], async (err, result) => {

            if (err) {

                console.log(err);

                return res.json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.length === 0) {

                return res.json({
                    success: false,
                    message: "User not found"
                });

            }

            const user = result[0];

            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!isMatch) {

                return res.json({
                    success: false,
                    message: "Current password is incorrect"
                });

            }

            const hashedPassword = await bcrypt.hash(
                newPassword,
                10
            );

            db.query(
                `
                UPDATE users
                SET password = ?
                WHERE id = ?
                `,
                [
                    hashedPassword,
                    req.user.id
                ],
                (updateErr) => {

                    if (updateErr) {

                        console.log(updateErr);

                        return res.json({
                            success: false,
                            message: "Unable to update password"
                        });

                    }

                    return res.json({
                        success: true,
                        message: "Password changed successfully"
                    });

                }
            );

        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: "Something went wrong"
        });

    }

};
// ====================== EXPORT ======================

module.exports = {
    registerUser,
    loginUser,
    changePassword
};