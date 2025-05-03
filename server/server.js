const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const api = require('./routes/api');

const app = express();
const PORT = 3000;

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:4200', // Your Angular frontend URL
    credentials: true,
};

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));

// Custom error handler for malformed JSON
app.use((req, res, next) => {
    bodyParser.json()(req, res, (err) => {
        if (err) {
            console.error('Invalid JSON:', err.message);
            return res.status(400).json({ message: 'Invalid JSON format' });
        }
        next();
    });
});

// Routes
app.use('/fastkart', api);

app.get('/', (req, res) => {
    res.send('Hello from server');
});

// Start server
app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT);
});



