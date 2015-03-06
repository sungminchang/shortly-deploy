var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

var urlsSchema = mongoose.Schema({
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

urlsSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', urlsSchema);

module.exports = Link;
