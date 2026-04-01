const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { UserDetail } = require('./model');
const cors = require('cors');
dotenv.config();

const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;
const prefix = process.env.API_PREFIX;
const app = express();

app.use(cors({
    origin: "*", // or your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`${prefix}/get-user`, (req, res) => {
    UserDetail.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ status: 'error', message: err.message });
    });
});

app.post(`${prefix}/create-user`, async (req, res) => {
    try {
        const { first_name, last_name, email, password_hash, age } = req.body;
        // Basic validation
        if (!first_name || !last_name || !email || !password_hash) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields.' });
        }
        // Validate email format (basic)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ status: 'error', message: 'Invalid email format.' });
        }
        // Check if email already exists since email must be unique
        const existingUser = await UserDetail.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ status: 'error', message: 'Email already exists.' });
        }
        // Create user
        const user = await UserDetail.create({
            first_name,
            last_name,
            email,
            password_hash,
            age
        });
        res.json(user);
    } catch (err) {
        // Handle validation errors from Sequelize
        if (err.name === "SequelizeValidationError") {
            return res.status(400).json({ status: 'error', message: err.errors[0].message });
        }
        // Fallback error
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Example 403 Forbidden route (for demonstration)
app.get(`${prefix}/forbidden`, (req, res) => {
    res.status(403).json({ status: 'error', message: 'Forbidden' });
});

// Not Found handler
app.use((req, res, next) => {
    res.status(404).json({ status: 'error', message: 'Resource not found' });
});

// 500 Internal Server Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: err.message });
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}${prefix}`);
});