const express = require('express');
const userRoutes = require('./routes/userRoutes');
const userDataRoutes = require('./routes/userDataRoutes');
const userMessageRoutes=require('./routes/userMessageRoutes')
const app = express();
const cors = require('cors');
const { default: verifyToken } = require('./middlewares/authMiddleware');
// to parse incoming JSON data from requests
app.use(cors());
app.use(express.json({ limit: "50mb" }));  
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Routes
app.use('/api/user', userRoutes);
app.use('/api/userData', userDataRoutes);
app.use('/api/userMessage', userMessageRoutes);
app.get('/api/verify-token',verifyToken, (req, res) => {
    res.status(200).send('Token is valid');
});
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Error Handling Middleware

module.exports = app;
