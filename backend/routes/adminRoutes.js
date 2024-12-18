const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route for adding an admin
router.post('/add', adminController.createAdmin);

// Route for getting all admins
router.get('/', adminController.getAllAdmins);

// Route for getting admin by ID
router.get('/:id', adminController.getAdminById);

// Route for updating admin
router.put('/edit/:id', adminController.updateAdmin);

// Route for deleting admin
router.delete('/delete/:id', adminController.deleteAdmin);

// Route for sending OTP to admin's phone number
router.post('/send-otp', adminController.sendOtp);

// Route for verifying OTP
router.post('/verify-otp', adminController.verifyOtp);

module.exports = router;
