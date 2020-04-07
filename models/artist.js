require("./song");
require("./album");
var SongSchema = require('mongoose').model('Song').schema
var AlbumSchema = require('mongoose').model('Album').schema
var mongoose = require('mongoose')
, Schema = mongoose.Schema

var ArtistSchema = new Schema({
   name: {type: String, index: true}
   , albums: [AlbumSchema]
   , singles: [SongSchema]
   , playCount: {type: Number, default: 0} // Total plays
   }, {
   collection: 'artists'
});
   
module.exports = mongoose.model('Artist', ArtistSchema);