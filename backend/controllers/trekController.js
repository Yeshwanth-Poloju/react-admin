const Trek = require('../models/Trek');

exports.addTrek = async (req, res) => {
  try {
    const trek = new Trek({
      name: req.body.name,
      altitude: req.body.altitude,
      pickupPoint: req.body.pickupPoint,
      dropPoint: req.body.dropPoint,
      pricePerPerson: req.body.pricePerPerson,
      inclusion: req.body.inclusion,
      description: req.body.description,
      photos: req.files.map(file => file.path), // Save the file paths to MongoDB
    });

    await trek.save();
    res.status(201).json(trek);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all treks
exports.getTreks = async (req, res) => {
  try {
    const treks = await Trek.find();
    res.status(200).json(treks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a trek by ID
exports.getTrekById = async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);
    if (!trek) {
      return res.status(404).json({ message: 'Trek not found' });
    }
    res.status(200).json(trek);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a trek
exports.editTrek = async (req, res) => {
  try {
    const trek = await Trek.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(trek);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a trek
exports.deleteTrek = async (req, res) => {
  try {
    await Trek.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
