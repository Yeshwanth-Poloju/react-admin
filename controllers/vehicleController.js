const Vehicle = require('../models/Vehicle');

// Add a vehicle
exports.addVehicle = async (req, res) => {
    try {
        const { name, pricePerDay, pickupPoint, dropPoint, termsAccepted } = req.body;
        const photos = req.files.map(file => file.path); // Assuming files are being uploaded via Multer

        const vehicle = new Vehicle({
            name,
            pricePerDay,
            pickupPoint,
            dropPoint,
            photos,
            termsAccepted
        });

        await vehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
