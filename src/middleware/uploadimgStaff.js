const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avataStaff')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
})


var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif|svg/;

        //check extension names
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      
        const mimeType = fileTypes.test(file.mimetype);
      
        if (mimeType && extName) {
          return cb(null, true);
        } else {
          cb("Error: You can Only Upload Images!!");
        }
    },
    limits:{
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;