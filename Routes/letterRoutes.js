const express = require('express');
const router = express.Router();
const arModel = require('../Models/arLetterModel');
const enModel = require('../Models/enLetterModel');
const letterController = require('../Controllers/letterController');

//Arabic Letters routes
router.get('/arabic', letterController.getAllLetters(arModel));
router.get('/arabic/:id', letterController.getLetterById(arModel));
router.post('/arabic', letterController.createLetter(arModel));

//English Lettters routes
router.get('/english', letterController.getAllLetters(enModel));
router.get('/english/:id', letterController.getLetterById(enModel));
router.post('/english', letterController.createLetter(enModel));

module.exports = router;