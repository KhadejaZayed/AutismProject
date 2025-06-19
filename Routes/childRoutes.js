const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const childController = require('../Controllers/childController');

router.post('/create', authMiddleware, childController.createChildProfile);
router.get('/', authMiddleware, childController.getChildInfo);
router.put('/update', authMiddleware, childController.updateChildProfile);
router.delete('/delete', authMiddleware, childController.deleteChildProfile);

module.exports = router;