const express    = require("express");
const router     = express.Router();    
const coinsController = require("../Controllers/coinsController");
const authMiddleware = require('../Middlewares/authMiddleware');

router.get("/",        authMiddleware, coinsController.getCoins);
router.post("/add",    authMiddleware, coinsController.addCoins);
router.post("/deduct", authMiddleware, coinsController.deductCoins);
router.post("/levelup",authMiddleware, coinsController.levelUp);
// router.post("/reset",  authMiddleware, coinsController.resetCoins);

module.exports = router;