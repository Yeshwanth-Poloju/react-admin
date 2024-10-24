const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    pickupPoint: { type: String, required: true },
    dropPoint: { type: String, required: true },
    photos: { type: [String], required: true }, // Array of image URLs
    termsAccepted: { type: Boolean, required: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
