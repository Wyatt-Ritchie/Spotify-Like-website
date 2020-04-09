require("./artist");
var ArtistSchema = require('mongoose').model('Artist').schema

var mongoose = require('mongoose')
, Schema = mongoose.Schema

var AlbumSchema = new Schema({
     name: {type: String, index: true}
   , image: {type:String} // Cover image path
   , artist: ArtistSchema
   }, {
   collection: 'albums'
});
   
module.exports = mongoose.model('Album', AlbumSchema);