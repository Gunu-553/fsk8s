const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


app.use(express.json());

// Database configuration
const dbConfig = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    connectTimeout: 20000, // 20 seconds
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Endpoint to retrieve user data
app.get('/users', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Users');
        res.status(200).json(results);
    } catch (error) {
        console.error('Error querying the database: ', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to add a new user
app.post('/users', async (req, res) => {
    const { name, address } = req.body;
    try {
        const query = 'INSERT INTO Users (name, address) VALUES (?, ?)';
        await pool.query(query, [name, address]);
        res.status(201).send('User added successfully');
    } catch (error) {
        console.error('Error inserting into the database: ', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
