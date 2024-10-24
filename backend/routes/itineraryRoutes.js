const express = require('express');
const {
    createItinerary,
    getAllItineraries,
    getItineraryById,
    updateItinerary,
    deleteItinerary
} = require('../controllers/itineraryController');
const path = require('path');

const router = express.Router();

// Define routes for itineraries
router.post('/', createItinerary);
router.get('/', getAllItineraries);
router.get('/:id', getItineraryById);
router.put('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

// Route to serve a PDF for a given itinerary ID
router.get('/:id/pdf', (req, res) => {
    const itineraryId = req.params.id;
    
    // Path to the PDF file (update the path based on your file structure)
    const pdfFilePath = path.join(__dirname, '../pdfs', `itinerary-${itineraryId}.pdf`);
    
    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=itinerary-${itineraryId}.pdf`);
    
    // Send the PDF file
    res.sendFile(pdfFilePath, (err) => {
        if (err) {
            console.error('Error sending the file:', err);
            res.status(404).send('PDF not found');
        }
    });
});

module.exports = router;
