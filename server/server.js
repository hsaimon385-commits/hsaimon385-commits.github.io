const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const { Server } = require('socket.io');
const http = require('http');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Note: Ensure you have created this file, otherwise comment it out
// require('./config/passport'); 

const app = express();
const server = http.createServer(app);

// Update CORS to allow your frontend (assuming localhost:3000 for local dev)
const io = new Server(server, { 
  cors: { 
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend URL
    methods: ["GET", "POST"]
  } 
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(passport.initialize());

// Email transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// Routes (Ensure these files exist in your routes folder)
// app.use('/api/auth', require('./routes/auth')); 
app.use('/api/events', require('./routes/events'));
// app.use('/api/rsvps', require('./routes/rsvps'));

// Socket.io for real-time
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('rsvp', (eventId) => {
    io.emit('rsvp-update', `New RSVP for event ${eventId}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
