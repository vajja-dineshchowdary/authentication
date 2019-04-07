import express from "express";
import session from 'express-session';
import bodyParser from "body-parser";
import cors from 'cors';
const app = express();
const flash = require('connect-flash');
const www = process.env.WWW || './';
const passport = require('passport');
require('./_helpers/passport')(passport);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(www));
app.use(session({
  secret: 'secret cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//   res.sendFile(`index.html`, { root: www });
// });


module.exports = app;

