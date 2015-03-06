var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Promise = require('bluebird');


var usersSchema = mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now}
});

usersSchema.methods.comparePassword = function(attemptedPassword, callback){
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});


var User = mongoose.model('User', usersSchema);



module.exports = User;
