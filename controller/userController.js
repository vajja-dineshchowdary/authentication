const User = require('../models/User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
import passport from 'passport';
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

// check the image upload
exports.upload = multer(multerOptions).single('image');



exports.register = async (req, res, next) => {  
  try {
    // check if there is no new file to resize
      if (!req.file) {
        next(); // skip to the next middleware
        return;
      }
      const data = JSON.parse(req.body.data);
      const extension = req.file.mimetype.split('/')[1];
      data.image = `${uuid.v4()}.${extension}`;
      const photo = await jimp.read(req.file.buffer);
      // await photo.resize(800, jimp.AUTO);
      await photo.write(`./public/uploads/${data.image}`);
      User.register(new User(data), data.password)
          .then(user =>  res.send({sucess:'User Registered'}))
          .catch(err => {
            return next(err);
          });
      } 
  catch (error) {
      console.error(error);
    }
  // res.send({body: req.body, file: req.file});
}