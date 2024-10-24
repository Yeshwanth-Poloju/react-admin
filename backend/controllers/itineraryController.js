const Itinerary = require('../models/Itinerary');

// Create a new itinerary
exports.createItinerary = async (req, res) => {
    try {
        const itinerary = new Itinerary({
            name: req.body.name,
            // altitude: req.body.altitude,
            pickup: req.body.pickup,
            drop: req.body.drop,
            totalDays: req.body.totalDays,
            price: req.body.price,
            // inclusion: req.body.inclusion,
            description: req.body.description,
            photos: req.files.map(file => file.path), // Save the file paths to MongoDB
          });
        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single itinerary by ID
exports.getItineraryById = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an itinerary
exports.updateItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an itinerary
exports.deleteItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
