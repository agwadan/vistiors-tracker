/* IMPORTING NECESSARY FUNCTIONS & MODULES
------------------------------------------ */
const db = require('../db'); 
const crypto = require('crypto'); 
const { use } = require('../routes/userRoutes');
const bcrypt = require('bcrypt');
const { log } = require('console');

/* REGISTERING A NEW USER
------------------------- */
exports.registerUser = async (req, res) => {
    const { name, PIN } = req.body;
    const userId = crypto.randomBytes(3).toString('hex').slice(0, 5).toUpperCase();
    const hashedPIN = await bcrypt.hash(PIN, 10);

    const sql = 'INSERT INTO users (id, name, PIN) VALUES (?, ?, ?)';

    db.query(sql, [userId, name, hashedPIN], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User registered', name: name, userId });
    });
};

/*  CHECK USER IN & OUT
------------------------- */

exports.checkInOutUser = (req, res) => {
    const { userId, userPIN } = req.body;
    console.log('====================================');
    console.log(userId);
    console.log('====================================');

    // SQL query to fetch the user's PIN from the database
    const sqlGetUser = 'SELECT PIN FROM users WHERE id = ?';

    db.query(sqlGetUser, [userId], async (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const storedHashedPIN = result[0].PIN;

        // Compare the provided PIN with the stored hashed PIN
        const isMatch = await bcrypt.compare(userPIN, storedHashedPIN);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid PIN. Access denied' });
        }

        // If the PIN matches, proceed with check-in/check-out
        const sqlCheckLastEntry = 'SELECT * FROM clock_in_logs WHERE user_id = ? ORDER BY entry_time DESC LIMIT 1';

        db.query(sqlCheckLastEntry, [userId], (err, result) => {
            if (err) throw err;

            if (result.length && result[0].exit_time === null) {
                // User is checking out
                const exitTime = new Date();
                const sqlExit = 'UPDATE clock_in_logs SET exit_time = ? WHERE user_id = ?';
                db.query(sqlExit, [exitTime, userId], (err, updateResult) => {
                    if (err) throw err;
                    res.json({ message: 'Exit logged', exitTime });
                });
            } else {
                // User is checking in
                const entryTime = new Date();
                const sqlEntry = 'INSERT INTO clock_in_logs (user_id, entry_time) VALUES (?, ?)';
                db.query(sqlEntry, [userId, entryTime], (err, insertResult) => {
                    if (err) throw err;
                    res.json({ message: 'Entry logged', entryTime });
                });
            }
        });
    });
};

