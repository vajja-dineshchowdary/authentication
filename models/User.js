import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import passportLocalMongoose from 'passport-local-mongoose';



const userSchema = new Schema({
  email:   {
    type: String,
    unique: true,
    lowecase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  firstName:  {
    type: String,
    trim: true
  },
  lastName: String,
  image: String,
  date: { type: Date, default: Date.now }
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'email', passwordField: 'password' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);