const reportModel = require("../models/reportModel");

// ====================== GET DASHBOARD REPORT ======================

const getDashboardReport = (req, res) => {

    reportModel.getDashboardReport((err, result) => {

        if (err) {

            console.log(err);

            return res.json({
                success: false,
                message: "Unable to fetch reports"
            });

        }

        return res.json({
            success: true,
            report: result[0]
        });

    });

};

module.exports = {
    getDashboardReport
};