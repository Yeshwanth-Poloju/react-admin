// /backend/routes/trekRoutes.js
const express = require('express');
const router = express.Router();
const trekController = require('../controllers/trekController');
const upload = require('../middleware/multerConfig');

// Route to handle trek creation with multiple file uploads (max 5 files)
router.post('/treks', upload.array('photos', 5), trekController.addTrek);
router.get('/treks', trekController.getTreks);
router.get('/treks/:id', trekController.getTrekById);
router.put('/treks/:id', trekController.editTrek);
router.delete('/treks/:id', trekController.deleteTrek);

module.exports = router;
