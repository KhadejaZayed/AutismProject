const express  = require("express");
const router   = express.Router();    
const authController = require("../Controllers/authController");

router.post("/sign",           authController.signUser);
router.post("/login",          authController.loginUser);

router.post('/changePassword', authController.changePassword);

module.exports = router;
