const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin'] }, // Ensure this field is present
});

module.exports = mongoose.model('User', userSchema);
