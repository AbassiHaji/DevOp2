import express from 'express';
import bodyParser from 'body-parser';

const port = 3000;
const host = '192.168.0.7';
const prefix = '/api/v1';
const app = express();

// CORS middleware to set Access-Control-Allow-Origin header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // You can restrict this to your frontend's origin if needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Handle preflight requests quickly
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`${prefix}/get-user`, (req, res) => {
    res.json({ 
        status: 'success',
        message: 'Successfully fetched the data',
        data: {
            name: 'John Doe',
            age: 20,
            email: 'john.doe@example.com'
        }
    });
});

app.post(`${prefix}/create-user`, (req, res) => {
    res.json({
        status: 'success',
        message: 'Successfully created the data',
        data: {
            ...req.body
        }
    });
});

// Example 403 Forbidden route (for demonstration)
app.get(`${prefix}/forbidden`, (req, res) => {
    res.status(403).json({ error: 'Forbidden' });
});

// Not Found handler
app.use((req, res, next) => {
    res.status(404).json({ status: 'error', message: 'Not Found' });
});

// 500 Internal Server Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}${prefix}`);
});