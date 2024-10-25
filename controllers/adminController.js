const Admin = require('../models/Admin'); // Make sure you have an Admin model
const { client, verifyServiceSid } = require('../config/twilioConfig');

// Send OTP
exports.sendOtp = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        // Send OTP using Twilio Verify
        await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({
                to: phoneNumber,
                channel: 'sms'
            });

        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ message: 'Failed to send OTP', error });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        const verificationCheck = await client.verify.v2.services(verifyServiceSid)
            .verificationChecks
            .create({
                to: phoneNumber,
                code: otp
            });

        if (verificationCheck.status === 'approved') {
            return res.status(200).json({ message: 'OTP verified successfully' });
        }

        return res.status(400).json({ message: 'Invalid or expired OTP' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Failed to verify OTP', error });
    }
};



// Create a new admin
exports.createAdmin = async (req, res) => {
    try {
        const { name, email, username, password, phoneNumber } = req.body;
        const newAdmin = new Admin({ name, email, username, password, phoneNumber });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update admin
exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
