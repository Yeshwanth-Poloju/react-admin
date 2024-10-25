const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const multer = require('multer');

// Configure multer for photo upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define where to store the photos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to add a vehicle
router.post('/add', upload.array('photos', 4), vehicleController.addVehicle); // Up to 4 photos

// Route to get all vehicles
router.get('/', vehicleController.getAllVehicles);

module.exports = router;
