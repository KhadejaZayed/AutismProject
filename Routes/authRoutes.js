const express  = require("express");
const router   = express.Router();    
const authController = require("../Controllers/authController");

// TODO: Add Logout Function

router.post("/sign/user", authController.signUser);
router.post("/login/user", authController.loginUser);

module.exports = router;