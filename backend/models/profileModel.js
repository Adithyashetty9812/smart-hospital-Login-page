const db = require("../config/db");

const getProfile = (userId, callback) => {

    const query = `
        SELECT id, full_name, email, phone, role
        FROM users
        WHERE id = ?
    `;

    db.query(query, [userId], callback);
};

const updateProfile = (userId, data, callback) => {

    const query = `
        UPDATE users
        SET full_name = ?, phone = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            data.full_name,
            data.phone,
            userId
        ],
        callback
    );
};

module.exports = {
    getProfile,
    updateProfile
};