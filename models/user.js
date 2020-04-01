require("./song");
var SongSchema = require('mongoose').model('Song').schema
var mongoose = require('mongoose')
, Schema = mongoose.Schema

let userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      index: true
   },
   hashedPassword: String,
   isPremium: Boolean,
   songs: [SongSchema]

}, {
   collection: 'users'
});

module.exports = mongoose.model('User', userSchema);