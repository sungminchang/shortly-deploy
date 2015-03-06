// var Bookshelf = require('bookshelf');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', function(){
  console.log('Database is open for business!');
});

module.exports = db;
