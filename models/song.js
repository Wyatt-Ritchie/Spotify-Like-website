require("./artist");
require("./album");
var ArtistSchema = require('mongoose').model('Artist').schema
var AlbumSchema = require('mongoose').model('Album').schema
var mongoose = require('mongoose')
, Schema = mongoose.Schema

var SongSchema = new Schema({
  name: {type: String}
, src: {type: String}
, playCount: {type: Number, default: 0} // Total plays
, artist: ArtistSchema
, album: AlbumSchema
}, {
   collection: 'songs'
});

module.exports = mongoose.model('Song', SongSchema);