// var Bookshelf = require('bookshelf');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://MongoLab-3:a1.H1_Bd7k6iTj4HpxZuokOQdem17cnVPAhJ5mccmuA-@ds031108.mongolab.com:31108/MongoLab-3');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', function(){
  console.log('Database is open for business!');
});

module.exports = db;
