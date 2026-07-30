const adminDashboardModel = require("../models/adminDashboardModel");

// Get Admin Dashboard Statistics
const getDashboardStats = (req, res) => {

    adminDashboardModel.getDashboardStats((err, result) => {

        if (err) {

            console.log(err);

            return res.json({
                success: false,
                message: "Unable to fetch dashboard statistics"
            });

        }

        return res.json({
            success: true,
            stats: result[0]
        });

    });

};

module.exports = {
    getDashboardStats
};