const express    = require("express");
const router     = express.Router();    
const coinsController = require("../Controllers/coinsController");
const authMiddleware = require('../Middleware/authMiddleware');

router.get("/",authMiddleware,coinsController.getCoins);
router.post("/add",authMiddleware, coinsController.addCoins);
router.post("/deduct",authMiddleware, coinsController.deductCoins);
//router.post("/reset", userController.resetCoins);
router.post("/levelup",authMiddleware, coinsController.levelUp);

module.exports = router;
