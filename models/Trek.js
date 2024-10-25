const mongoose = require('mongoose');

const trekSchema = new mongoose.Schema({
  name: { type: String, required: true },
  altitude: { type: Number, required: true },
  pickupPoint: { type: String, required: true },
  dropPoint: { type: String, required: true },
  pricePerPerson: { type: Number, required: true },
  inclusion: { type: String, required: true },
  description: { type: String, required: true },
  photos: { type: [String], required: true }, // Array of photo URLs
}, { timestamps: true });

const Trek = mongoose.model('Trek', trekSchema);

module.exports = Trek;
