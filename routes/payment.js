// /backend/routes/payment.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Trip = require('../models/Trip'); // Import the Trip model

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY
});

router.post('/', async (req, res) => {
  const { tripId } = req.body;

  try {
    // Fetch trip details from the database
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).send('Trip not found');
    }

    const options = {
      amount: trip.price * 100, // Convert price to paise
      currency: 'INR',
      receipt: `receipt#${tripId}`,
      notes: { tripId }
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
