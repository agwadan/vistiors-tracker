// index.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express();
app.use(express.json()); // Parse incoming JSON requests
app.use(cors());

// Use the user routes
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('API is working!');
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
