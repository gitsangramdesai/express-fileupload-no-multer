var express = require('express');
var router = express.Router();
var path = require('path')
var moment = require('moment')

//var { upload } = require('../utils/upload')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/fileupload', function (req, res, next) {
  const profilePic = req.files.profilePic;
  const extensionName = path.extname(profilePic.name); // fetch the file extension
  const allowedExtension = ['.png', '.jpg', '.jpeg'];

  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send("Invalid Image");
  }

  var currentDate = new moment()
  var dateString = currentDate.format('DDMMYYHHmmss')
  var uploadPath = require('path').resolve('./')
  uploadPath = uploadPath + '/public/uploads/profilePic/' + dateString + '_' + profilePic.name;
  profilePic.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", body: req.body });
  });

});


module.exports = router;
