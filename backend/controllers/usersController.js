/* IMPORTING NECESSARY FUNCTIONS & MODULES
------------------------------------------ */
const db = require('../db'); 
const crypto = require('crypto'); 
const { use } = require('../routes/userRoutes');

/* REGISTERING A NEW USER
------------------------- */
exports.registerUser = (req, res) => {
    const { name, PIN } = req.body;
    const userId = crypto.randomBytes(3).toString('hex').slice(0, 5).toUpperCase();
    const sql = 'INSERT INTO users (id, name, PIN) VALUES (?, ?, ?)';

    db.query(sql, [userId, name, PIN], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User registered', name: name, userId });
    });
};

/*  CHECK USER IN & OUT
------------------------- */

exports.checkInOutUser = (req, res) => {
    const { userId } = req.body;

    // SQL query to find the most recent clock-in log for the user
    const sqlCheckLastEntry = 'SELECT * FROM clock_in_logs WHERE user_id = ? ORDER BY entry_time DESC LIMIT 1';

    db.query(sqlCheckLastEntry, [userId], (err, result) => {
        if (err) throw err;

        // Check if the user has an ongoing session without an exit time
        if (result.length && result[0].exit_time === null) {
            const exitTime = new Date();
            console.log('====================================');
            console.log(exitTime);
            console.log('====================================');

            // SQL query to update the existing record with exit time
            const sqlExit = 'UPDATE clock_in_logs SET exit_time = ? WHERE user_id = ?';
            db.query(sqlExit, [exitTime, userId], (err, updateResult) => {
                if (err) throw err;

                // Fetch user details and send the response with exit time
                const sqlGetUser = 'SELECT * FROM users WHERE id = ?';
                db.query(sqlGetUser, [userId], (err, userResult) => {
                    if (err) throw err;
                    res.json({ message: 'Exit logged', exitTime});
                });
            });
        } else {
            // If there's no ongoing session, log a new entry time (user is checking in)
            const entryTime = new Date();

            // SQL query to insert new clock-in record
            const sqlEntry = 'INSERT INTO clock_in_logs (user_id, entry_time) VALUES (?, ?)';
            db.query(sqlEntry, [userId, entryTime], (err, insertResult) => {
                if (err) throw err;

                // Fetch user details and send the response with entry time
                const sqlGetUser = 'SELECT * FROM users WHERE id = ?';
                db.query(sqlGetUser, [userId], (err, userResult) => {
                    if (err) throw err;
                    res.json({ message: 'Entry logged', entryTime, user: userResult[0] });
                });
            });
        }
    });
};

