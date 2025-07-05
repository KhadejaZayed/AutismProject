const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const childController = require('../Controllers/childController');
const upload = require('../Middlewares/multer');

router.get('/', authMiddleware, childController.getChildInfo);
router.delete('/delete', authMiddleware, childController.deleteChildProfile);

router.post(
    '/create', 
    authMiddleware,
    upload.fields([
        { name: 'picture', maxCount: 1 },
        { name: 'videoIntro', maxCount: 1 }
    ]),
    childController.createChildProfile
);    
router.put(
    '/update',
    authMiddleware,
    upload.fields([
        { name: 'picture', maxCount: 1 },
        { name: 'videoIntro', maxCount: 1 }
    ]),
    childController.updateChildProfile
);

module.exports = router;