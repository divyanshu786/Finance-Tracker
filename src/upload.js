const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // Ensure the uploads directory exists
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        console.log('uploadsDir', uploadsDir);
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // limit file size to 5MB
    fileFilter: (req, file, cb) => {
        // Check file type
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

module.exports = upload;
