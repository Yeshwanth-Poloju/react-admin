// controllers/bookingController.js
const Booking = require('../models/bookingModel');

// Get all bookings for admin
exports.getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const bookings = await Booking.find().populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  } 
};

// Create a booking
exports.createBooking = async (req, res) => {
    try {
        const { itemId, itemType, itemName, price, paymentId, paymentStatus, user, userDetails } = req.body;

        const bookingData = {
            itemId,
            itemType,
            itemName,
            price,
            paymentId,
            paymentStatus,
            user,
            userDetails,
        };

        const booking = new Booking(bookingData);
        await booking.save();
        res.status(201).json({ message: 'Booking saved successfully', booking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Failed to save booking', error: error.message });
    }
};
