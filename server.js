const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();

app.use(cors({
    origin: '*', // Allow all origins (use specific origins in production)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '030405',
    database: 'my_project'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Register route
app.post('/register', (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    connection.query(query, [fullname, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', full_name: user.fullname });
    });
});

// Start the server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://192.168.3.103:3000');
});
