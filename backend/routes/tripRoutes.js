// /backend/routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Define routes
router.post('/trips', tripController.addTrip); // Add a new trip
router.get('/trips', tripController.getTrips); // Get all trips
router.get('/trips/:id', tripController.getTripById); // Get a trip by ID (this method needs to be added)
router.put('/trips/:id', tripController.editTrip); // Edit a trip
router.delete('/trips/:id', tripController.deleteTrip); // Delete a trip

module.exports = router;
