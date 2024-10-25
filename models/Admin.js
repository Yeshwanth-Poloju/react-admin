const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String }, // Field for storing OTP
    otpCreatedAt: { type: Date }, // Timestamp for when OTP was created
    otpVerified: { type: Boolean, default: false }, // Status to check if OTP is verified
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
