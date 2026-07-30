const appointmentModel = require("../models/appointmentModel");

// ====================== BOOK APPOINTMENT ======================

const bookAppointment = (req, res) => {

    const patient_id = req.user.id;

    const {
        doctor_name,
        appointment_date,
        appointment_time,
        reason
    } = req.body;

    appointmentModel.createAppointment(
        {
            patient_id,
            doctor_name,
            appointment_date,
            appointment_time,
            reason
        },
        (err) => {

            if (err) {
                console.log(err);

                return res.json({
                    success: false,
                    message: "Unable to book appointment"
                });
            }

            return res.json({
                success: true,
                message: "Appointment booked successfully"
            });

        }
    );

};

// ====================== PATIENT APPOINTMENTS ======================

const getAppointments = (req, res) => {

    appointmentModel.getAppointmentsByPatient(
        req.user.id,
        (err, result) => {

            if (err) {
                return res.json({
                    success: false,
                    message: "Error fetching appointments"
                });
            }

            return res.json({
                success: true,
                appointments: result
            });

        }
    );

};

// ====================== CANCEL APPOINTMENT ======================

const cancelAppointment = (req, res) => {

    appointmentModel.cancelAppointment(
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
                message: "Appointment cancelled successfully"
            });

        }
    );

};

// ====================== ADMIN - GET ALL APPOINTMENTS ======================

const getAllAppointments = (req, res) => {

    appointmentModel.getAllAppointments((err, result) => {

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

    });

};

// ====================== ADMIN - UPDATE STATUS ======================

const updateAppointmentStatus = (req, res) => {

    const { status } = req.body;

    appointmentModel.updateAppointmentStatus(

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

// ====================== ADMIN - DELETE APPOINTMENT ======================

const deleteAppointment = (req, res) => {

    appointmentModel.deleteAppointment(

        req.params.id,

        (err) => {

            if (err) {

                console.log(err);

                return res.json({
                    success: false,
                    message: "Unable to delete appointment"
                });

            }

            return res.json({
                success: true,
                message: "Appointment deleted successfully"
            });

        }

    );

};

module.exports = {

    bookAppointment,

    getAppointments,

    cancelAppointment,

    getAllAppointments,

    updateAppointmentStatus,

    deleteAppointment

};