import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../services/changePasswordService";
import { logoutUser } from "../services/authService";

import "./Dashboard.css";

function ChangePasswordPage() {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        setSuccess("");

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            setError("All fields are required.");

            return;

        }

        if (newPassword !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        if (newPassword.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;

        }

        setLoading(true);

        try {

            await changePassword({

                currentPassword,

                newPassword

            });

            setSuccess(
                "Password changed successfully. Please login again."
            );

            setTimeout(() => {

                logoutUser();

                navigate("/login");

            }, 2000);
        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="dash-page">

            <div className="dash-body">

                <div className="dash-welcome">

                    <h1>Change Password</h1>

                    <p>Update your account password securely.</p>

                </div>

                <form
                    className="upcoming-card"
                    onSubmit={handleSubmit}
                >

                    <label>

                        Current Password

                    </label>

                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <label>

                        New Password

                    </label>

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <label>

                        Confirm Password

                    </label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    {error && (

                        <p
                            style={{
                                color: "red",
                                fontWeight: "600"
                            }}
                        >
                            {error}
                        </p>

                    )}

                    {success && (

                        <p
                            style={{
                                color: "green",
                                fontWeight: "600"
                            }}
                        >
                            {success}
                        </p>

                    )}

                    <button
                        type="submit"
                        className="dash-primary-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Updating..."
                            : "Change Password"}
                    </button>

                    <button
                        type="button"
                        className="btn-outline"
                        style={{ marginLeft: "15px" }}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ChangePasswordPage;