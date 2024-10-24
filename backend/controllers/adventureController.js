const Adventure = require('../models/adventure');

// Add Adventure
exports.addAdventure = async (req, res) => {
  try {
    const { name, price, location, altitude, description } = req.body;
    const photos = req.files.map((file) => file.path); // Assuming you're uploading photos
    const newAdventure = new Adventure({ name, price, location, altitude, description, photos });
    await newAdventure.save();
    res.status(201).json(newAdventure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Adventures
exports.getAdventures = async (req, res) => {
  try {
    const adventures = await Adventure.find();
    res.status(200).json(adventures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Adventure
exports.editAdventure = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdventure = await Adventure.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAdventure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Adventure
exports.deleteAdventure = async (req, res) => {
  try {
    const { id } = req.params;
    await Adventure.findByIdAndDelete(id);
    res.status(200).json({ message: 'Adventure deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
