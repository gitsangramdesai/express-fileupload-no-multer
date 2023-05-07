var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var uploadPath = require('path').resolve('./')
        if (file.fieldname == "profilePic") {
            uploadPath = uploadPath + '/public/uploads/profilePic/'
            callback(null, uploadPath);
        } else if (file.fieldname == "resume") {
            uploadPath = uploadPath + '/public/uploads/resume/'
            callback(null, '../public/uploads/resume/');
        } else {
            uploadPath = uploadPath + '/public/uploads/other/'
            callback(null, '../public/uploads/other/');
        }
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname == "profilePic") {
        if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    if (file.fieldname == "resume") {
        if ((file.mimetype).includes('doc') || (file.mimetype).includes('openxmlformats')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
};

var upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1 * 1024 * 1024 } })

module.exports = {
    upload: upload
}