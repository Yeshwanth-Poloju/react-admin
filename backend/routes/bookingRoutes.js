// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBookings, createBooking } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/admin/bookings', authMiddleware, getAllBookings);

router.post('/admin/bookings',authMiddleware, createBooking);

module.exports = router;
