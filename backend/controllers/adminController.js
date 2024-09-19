// controllers/adminController.js
const db = require('../db');

// Get all currently checked-in users
exports.getCheckedInUsers = (req, res) => {
    const sql = `
        SELECT u.name, u.id, c.entry_time 
        FROM users u 
        JOIN clock_in_logs c ON u.id = c.user_id 
        WHERE c.exit_time IS NULL;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        res.json({
            users: results,
            count: results.length
        });
    });
};
