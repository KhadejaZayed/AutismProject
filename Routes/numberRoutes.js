const express = require('express');
const router = express.Router();
const numberController = require('../Controllers/numberController');

router.get('/', numberController.getAllNumbers);
// router.post('/', numberController.createNumber);
router.get('/:id', numberController.getSingleNumber);

module.exports = router;
