var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
import User from '../models/User';
module.exports = function(passport) {



passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
}