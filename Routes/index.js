import express from 'express';
const router = express.Router();
import userController from "../controller/userController.js";
import authController from '../controller/authController.js';
const passport = require('passport');

router.post('/register', userController.upload, userController.register);

router.post('/login', authController.login, (req, res) => {
const user = req.user._doc;
  ['hash', 'salt', 'date'].map(data => delete user[data]);
  res.send(req.user);
});

module.exports = router;
