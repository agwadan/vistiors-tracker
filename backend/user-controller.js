// Register new user
app.post('/register', (req, res) => {
  const { name, id_number } = req.body;
  //const uniqueId = Math.random().toString(36).substr(2, 9); // Generate a simple unique ID
  const sql = 'INSERT INTO users (name, id_number) VALUES (?, ?)';
  
  db.query(sql, [name, id_number], (err, result) => {
      if (err) throw err;
      res.json({ message: 'User registered', uniqueId });
  });
});

//Check user in & out
app.post('/check-in', (req, res) => {
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
});
