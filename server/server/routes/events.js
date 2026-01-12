const express = require('express');
const router = express.Router();
// You must ensure this Model file exists
const Event = require('../models/Event'); 
// const auth = require('../middleware/auth'); // Commented out until you create the middleware

// Get events (with pagination)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const events = await Event.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create event (Removed 'auth' middleware for testing purposes, add back when ready)
router.post('/', async (req, res) => {
  try {
    // Assuming req.body contains the necessary fields
    const event = new Event({ ...req.body }); 
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
