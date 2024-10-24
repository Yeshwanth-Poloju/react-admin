const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    totalDays: { type: Number, required: true },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{ type: String }], // Array to hold photo URLs
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
