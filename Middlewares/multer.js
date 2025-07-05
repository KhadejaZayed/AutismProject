const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';
    if (file.fieldname === 'videoIntro') {
      folder = path.join(__dirname, '..', 'public', 'uploads', 'videos');
    }else if (file.fieldname === 'picture') {
      folder = path.join(__dirname, '..', 'public', 'uploads', 'profile');
    }
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) =>{
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, uniqueSuffix + path.extname(file.originalname));
  } 
});

const upload = multer({storage});

module.exports = upload;