const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  });

//authenticate method
UserSchema.statics.authenticate = function(email, password, callback){
  User.findOne({email: email}, (err, user) => {
    if(err){
      return callback(err);
    }
    else if(!user){
      let err = new Error("User not found");
      return callback(err);
    }
    else{
      bcrypt.compare(password, user.password, (err, result) => {
        if(result){
          return callback(null, user);
        }
        else{
          return callback();
        }
      });
    }
  });
}

UserSchema.pre('save', function(next){
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) =>{
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  })
})

User = mongoose.model('User', UserSchema, 'user');
module.exports = mongoose.model('User', UserSchema, 'user');
