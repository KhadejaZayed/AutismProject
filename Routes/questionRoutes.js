const express            = require('express');
const router             = express.Router();
const questionController = require('../Controllers/questionController');

router.post('/create', questionController.createQuestion);
router.get('/all', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);

module.exports = router;