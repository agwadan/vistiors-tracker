// controllers/adminController.js
const db = require('../db');

// Helper function to get the start of the current day (midnight)
const getStartOfDay = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // set to midnight
    return now;
};

// Get all currently checked-in users and those who checked out today
exports.getAdminDashboardData = (req, res) => {
    const startOfDay = getStartOfDay();

    const sqlCheckedIn = `
        SELECT u.name, u.id, c.entry_time 
        FROM users u 
        JOIN clock_in_logs c ON u.id = c.user_id 
        WHERE c.exit_time IS NULL;
    `;

    const sqlCheckedOutToday = `
        SELECT COUNT(*) AS count
        FROM clock_in_logs
        WHERE exit_time IS NOT NULL
        AND exit_time >= ?;
    `;

    // Run both queries in parallel
    db.query(sqlCheckedIn, (err, checkedInUsers) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query(sqlCheckedOutToday, [startOfDay], (err, checkedOutResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const checkedOutCount = checkedOutResult[0].count;

            res.json({
                checkedInUsers: checkedInUsers,
                checkedOutCount: checkedOutCount,
                checkedInCount: checkedInUsers.length,
            });
        });
    });
};
