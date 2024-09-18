/* IMPORTING NECESSARY FUNCTIONS & MODULES
------------------------------------------ */
const db = require('../db'); 
const crypto = require('crypto'); 

/* REGISTERING A NEW USER
------------------------- */
exports.registerUser = (req, res) => {
    const { name, PIN } = req.body;
    const userId = crypto.randomBytes(6).toString('hex');
    const sql = 'INSERT INTO users (id, name, PIN) VALUES (?, ?, ?)';

    db.query(sql, [userId, name, PIN], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User registered', id: result.insertId });
    });
};

// Check user in & out
exports.checkInOutUser = (req, res) => {
    const { userId } = req.body;
    const sqlCheckLastEntry = 'SELECT * FROM clock_in_logs WHERE user_id = ? ORDER BY entry_time DESC LIMIT 1';

    db.query(sqlCheckLastEntry, [userId], (err, result) => {
        if (err) throw err;

        if (result.length && result[0].exit_time === null) {
            const exitTime = new Date();
            const sqlExit = 'UPDATE clock_in_logs SET exit_time = ? WHERE id = ?';
            db.query(sqlExit, [exitTime, result[0].id], (err, updateResult) => {
                if (err) throw err;
                res.json({ message: 'Exit logged', exitTime });
            });
        } else {
            const entryTime = new Date();
            const sqlEntry = 'INSERT INTO clock_in_logs (user_id, entry_time) VALUES (?, ?)';
            db.query(sqlEntry, [userId, entryTime], (err, insertResult) => {
                if (err) throw err;
                res.json({ message: 'Entry logged', entryTime });
            });
        }
    });
};
