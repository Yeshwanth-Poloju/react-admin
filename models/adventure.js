const mongoose = require('mongoose');

const adventureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  altitude: { type: Number, required: true },
  description: { type: String },
  photos: { type: [String] }, // Array of photo URLs or paths
}, { timestamps: true });

const Adventure = mongoose.model('Adventure', adventureSchema);
module.exports = Adventure;
