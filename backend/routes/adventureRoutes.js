const express = require('express');
const { addAdventure, getAdventures, editAdventure, deleteAdventure } = require('../controllers/adventureController');
const upload = require('../middleware/multerConfig'); // Assume you're using multer for file uploads

const router = express.Router();

router.post('/add', upload.array('photos', 4), addAdventure);
router.get('/', getAdventures);
router.put('/edit/:id', editAdventure);
router.delete('/delete/:id', deleteAdventure);


module.exports = router;
