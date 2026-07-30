const doctorDashboardModel = require("../models/doctorDashboardModel");

// Get all appointments for logged-in doctor
const getDoctorAppointments = (req, res) => {


const doctorName = req.user.full_name;



    doctorDashboardModel.getDoctorAppointments(
        doctorName,
        (err, result) => {

            if (err) {
                console.log(err);

                return res.json({
                    success: false,
                    message: "Unable to fetch appointments"
                });
            }

            return res.json({
                success: true,
                appointments: result
            });

        }
    );
};

// Confirm Appointment
const confirmAppointment = (req, res) => {

    doctorDashboardModel.confirmAppointment(
        req.params.id,
        (err) => {

            if (err) {
                return res.json({
                    success: false,
                    message: "Unable to confirm appointment"
                });
            }

            return res.json({
                success: true,
                message: "Appointment confirmed"
            });

        }
    );

};

// Cancel Appointment
const cancelAppointment = (req, res) => {

    doctorDashboardModel.cancelAppointment(
        req.params.id,
        (err) => {

            if (err) {
                return res.json({
                    success: false,
                    message: "Unable to cancel appointment"
                });
            }

            return res.json({
                success: true,
                message: "Appointment cancelled"
            });

        }
    );

};
// ================= GET PATIENT DETAILS =================

const getPatientDetails = (req, res) => {

    doctorDashboardModel.getPatientDetails(

        req.params.id,

        (err, result) => {

            if (err) {

                console.log(err);

                return res.json({

                    success: false,

                    message: "Unable to load patient details"

                });

            }

            if (result.length === 0) {

                return res.json({

                    success: false,

                    message: "Patient not found"

                });

            }

            return res.json({

                success: true,

                patient: result[0]

            });

        }

    );

};

// ================= UPDATE STATUS =================

const updateAppointmentStatus = (req, res) => {

    const { status } = req.body;

    doctorDashboardModel.updateAppointmentStatus(

        req.params.id,

        status,

        (err) => {

            if (err) {

                console.log(err);

                return res.json({

                    success: false,

                    message: "Unable to update appointment"

                });

            }

            return res.json({

                success: true,

                message: "Appointment updated successfully"

            });

        }

    );

};
module.exports = {
    getDoctorAppointments,
    confirmAppointment,
    cancelAppointment,
    getPatientDetails,
    updateAppointmentStatus
};