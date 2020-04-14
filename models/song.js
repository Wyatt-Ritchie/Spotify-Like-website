require("./artist");
require("./album");
var ArtistSchema = require('mongoose').model('Artist').schema
var AlbumSchema = require('mongoose').model('Album').schema
var mongoose = require('mongoose')
, Schema = mongoose.Schema

var SongSchema = new Schema({
  name: {type: String}
, src: {type: String}
, playCount: {type: Number, default: 0} // Total plays globally - not by user
, artist: ArtistSchema
, album: AlbumSchema
, image: {type: String}
, releaseDate:  {type: Date, default: Date.now}
, duration: {type: Number} // seconds
}, {
   collection: 'songs'
});

module.exports = mongoose.model('Song', SongSchema);