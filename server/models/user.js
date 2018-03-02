const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const config = require('../config');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    'username': { type: String, require: true, unique: true, lowercase: true  },
    'password': { type: String, require: true },
    'is_tutor': { type: Boolean, require: true, deafult: false },
    'avatar': { type: String },
    'display_name': { type: String },
    'desc': { type: String },
    'tutor': {
                'title': { type: String },
                'subject': { type: String },
             },
    'student': {
                 'major': { type: String },
                 'year': { type: String }
            }
    
});

// Hash the password before saving to DB
UserSchema.pre('save', function (next) {
    // get access to the user model
    const user = this;
    // rounds of salt
    const saltRounds = 10;

    // only if password is modified, we hash the password. 
    if (user.isModified('password')) {
      // generate a salt, then run callback
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            return next(err);
        }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            return next(err);
          }
          // overwrite plain text password with encrypted password
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });

UserSchema.statics.findByCredentials = function (username, password) {
  const User = this;
  return User.findOne({ username }).then( user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res){
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
}

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const timestamp = new Date().getTime();
  const token = jwt.sign({ sub: user._id.toHexString(), iat: timestamp}, config.secret).toString();
  return token;
}

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, config.secret)
  } catch (err) {
    return Promise.reject();
  }

  return User.findById(decoded.sub);
}

module.exports = mongoose.model('User', UserSchema);