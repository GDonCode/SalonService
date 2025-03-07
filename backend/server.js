const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const EXPapp = express();
const port = 8080;

// Middleware
const corsOptions = {
    origin: '*',  // Allow all origins for testing
    methods: ['GET', 'POST'],
};
EXPapp.use(cors(corsOptions));

EXPapp.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'RAnthonyMG#8', // Replace with your MySQL password
    database: 'payetontest' // Replace with your database name
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Booking Endpoint
EXPapp.post('/save', (req, res) => {
    const Booking = req.body;
    console.log('Booking data received:', Booking);

    // Convert Date to YYYY-MM-DD format
    if (!Booking.Date) {
        console.error('Date is required');
        res.status(400).send('Date is required');
        return;
    }
    const formattedDate = new Date(Booking.Date).toISOString().slice(0, 10);
    
    res.json(formattedDate); // Convert to YYYY-MM-DD format

    // Convert Time to 24-hour format
    let time = Booking.Time;

    // Check if time is in 12-hour format (e.g., '12:00 PM')
    if (time && (time.includes('AM') || time.includes('PM'))) {
        const [timeStr, period] = time.split(' '); // Split '12:00 PM' into ['12:00', 'PM']
        let [hour, minute] = timeStr.split(':'); // Split time into hours and minutes
        hour = parseInt(hour, 10);

        // Convert 12-hour time to 24-hour format
        if (period === 'AM' && hour === 12) {
            hour = 0; // Midnight is 00:00
        } else if (period === 'PM' && hour < 12) {
            hour += 12; // Convert PM hours (except 12 PM) to 24-hour format
        }

        // Format time to 24-hour HH:MM format
        time = `${hour.toString().padStart(2, '0')}:${minute}`;
    }

    // Validate Time: If not in proper format, return error
    if (!/^\d{2}:\d{2}$/.test(time)) {
        console.error('Invalid time format');
        res.status(400).send('Invalid time format');
        return;
    }

    // Store services as a string
    const serviceNames = Booking.Services.map(service => service.name).join(', ');

    const sql = `INSERT INTO bookings (BookingID, FirstName, LastName, Email, Phone, Services, Date, Time, Message, TotalCost, TotalDuration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        Booking.BookingID,
        Booking.FirstName,
        Booking.LastName,
        Booking.Email,
        Booking.Phone,
        serviceNames, // Store services as JSON string
        formattedDate, // Use formatted Date
        time, // Store Time as string
        Booking.Message,
        Booking.TotalCost,
        Booking.TotalDuration
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error occurred:', err);  // Log the error for debugging
            res.status(500).send('Error saving booking');
            return;
        }
        res.send('Booking saved successfully');
    });
});



EXPapp.get('/test', (req, res) => {
    res.send('Server is working!');
});



EXPapp.get('/booking-dates', (req, res) => {
    const getBookingDates = 'SELECT * FROM bookings';
    db.query(getBookingDates, (err, result) => {
        if (err) {
            console.error('Error occurred:', err);
            res.status(500).send('Error fetching booking dates');
            return;
        }
        res.json(result);
    });
});














// Start the server
EXPapp.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

