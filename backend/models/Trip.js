// /backend/models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  detailedItinerary: { type: String, required: true },
});

module.exports = mongoose.model('Trip', tripSchema);
