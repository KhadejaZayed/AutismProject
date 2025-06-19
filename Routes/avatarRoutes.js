const express = require('express');
const router = express.Router();
const avatarController = require('../Controllers/avatarController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get('/allAvatars', avatarController.getAllAvatars);
router.get('/mineAvatars', authMiddleware, avatarController.getUserAvatars);
router.get('/allPets', avatarController.getAllPets);
router.get('/minePets', authMiddleware, avatarController.getUserPets);

router.post('/buyAvatar', authMiddleware, avatarController.buyAvatar);
router.post('/buyPet', authMiddleware, avatarController.buyPet);

module.exports = router;
