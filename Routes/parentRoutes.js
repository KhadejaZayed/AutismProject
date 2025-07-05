const express = require('express');
const router = express.Router();
const parentController = require('../Controllers/parentController');
const authMiddleware = require('../Middlewares/authMiddleware');
const upload = require('../Middlewares/multer'); 

router.post(
  '/uploadPicture',
  authMiddleware,
  //handle a single file upload from a field called "picture" in the request
  upload.single('picture'),
  parentController.uploadProfilePicture
);
router.get("/", authMiddleware, parentController.getParentProfile)

module.exports = router;