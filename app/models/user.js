var db = require('../config');
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

usersSchema.methods.hashPassword = function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      console.log("CREATED HASH: ", hash);
      console.log("Logging this", this);
      this.password = hash;
      this.save();
      console.log("ths.password", this.password);
    });
};

var User = mongoose.model('User', usersSchema);

// db.once('open', function() {

// });


// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// db.once('open', function() {

//   // fluffy.speak() // "Meow name is fluffy"

//   var fluffy = new Url({ name: 'poop', size: '16' });
//   fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//   });

// });


module.exports = User;
