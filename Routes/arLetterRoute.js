const express = require('express');
const router = express.Router();
const arLetterController = require('../Controllers/arLetterController');

router.get('/', arLetterController.getAllLetters);
// router.post('/', arLetterController.createLetter);
router.get('/:id', arLetterController.getLetterById);

module.exports = router;