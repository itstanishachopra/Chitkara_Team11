const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const websocket = require('./utils/websocket');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// WebSocket setup
const server = require('http').createServer(app);
const io = require('socket.io')(server);
websocket(io);

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});