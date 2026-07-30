const profileModel = require("../models/profileModel");

const getProfile = (req, res) => {

    profileModel.getProfile(req.user.id, (err, result) => {

        if (err) {
            return res.json({
                success: false,
                message: "Unable to fetch profile"
            });
        }

        return res.json({
            success: true,
            user: result[0]
        });

    });

};

const updateProfile = (req, res) => {

    profileModel.updateProfile(
        req.user.id,
        req.body,
        (err) => {

            if (err) {
                return res.json({
                    success: false,
                    message: "Unable to update profile"
                });
            }

            return res.json({
                success: true,
                message: "Profile updated successfully"
            });

        }
    );

};

module.exports = {
    getProfile,
    updateProfile
};