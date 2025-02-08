const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 8080;

//Middleware
app.use(cors());
app.use(bodyparser.json());

//MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RAnthonyMG#8',
    database: 'payetontest'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL', err);
    }
    else {
        console.log('Connected to MySQL database');
    }
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//Endpoint to save data
app.post('/save', (req,res) => {
    const { BookingID, FirstName, LastName, Email, Phone, servicesString, Date, Time, Message, TotalCost, TotalDuration } = req.body;


    // INSERT Query 
    const query = `
            INSERT INTO bookings (
                BookingID, FirstName, LastName, Email, Phone, Services, Date, Time, Message, TotalCost, TotalDuration
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [BookingID, FirstName, LastName, Email, Phone, servicesString, Date, Time, Message, TotalCost, TotalDuration], (err, result) => {
        if (err) {
            console.error('Error saving booking:', err);
            return res.status(500).send('Error saving booking');
        }
        res.status(200).send('Booking saved successfully');
    });
});