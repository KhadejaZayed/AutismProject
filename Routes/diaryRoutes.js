const express = require('express');
const router = express.Router();
const diaryController = require('../Controllers/diaryController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/create', authMiddleware, diaryController.createDiaryEntry);

router.get("/all", authMiddleware, diaryController.getAllDiaries);
router.delete("/all", authMiddleware, diaryController.deleteAllDiaries);

router.put('/update/:id', authMiddleware, diaryController.updateDiaryEntry);
router.get("/:id", authMiddleware, diaryController.getADiary);
router.delete("/:id", authMiddleware, diaryController.deleteADiary);

module.exports = router;
