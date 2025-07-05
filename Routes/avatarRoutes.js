const express = require('express');
const router = express.Router();
const avatarController = require('../Controllers/avatarController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.get('/allAvatars', avatarController.getAllAvatars);
router.get('/allPets',    avatarController.getAllPets);
router.get('/mineAvatars', authMiddleware, avatarController.getUserAvatars);
router.get('/minePets',    authMiddleware, avatarController.getUserPets);

router.post('/buyAvatar', authMiddleware, avatarController.buyAvatar);
router.post('/buyPet',    authMiddleware, avatarController.buyPet);

router.post('/selectAvatar', authMiddleware, avatarController.selectAvatar);
router.post('/selectPet',    authMiddleware, avatarController.selectPet);


module.exports = router;