// models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemType: { type: String, required: true, enum: ['trek', 'Trip', 'Adventure', 'Itinerary'] },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    paymentId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentStatus: { type: String, required: true },
    userDetails: {
        name: String,
        email: String,
        phone: String,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
