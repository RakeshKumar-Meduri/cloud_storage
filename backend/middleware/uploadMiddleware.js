const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');
const fs = require('fs');

let upload;

if (s3) {
  // Use S3 if configured
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME || 'fallback-bucket',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'uploads/' + uniqueSuffix + '-' + file.originalname);
      }
    }),
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
  });
} else {
  // Fallback to local storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = 'uploads/';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });

  upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }
  });
}

module.exports = upload;
