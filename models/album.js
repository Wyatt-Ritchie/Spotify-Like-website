require("./song");
var SongSchema = require('mongoose').model('Song').schema
var mongoose = require('mongoose')
, Schema = mongoose.Schema

var AlbumSchema = new Schema({
     name: {type: String, index: true}
   , cover: {type:String} // Cover image path
   , songs: [SongSchema]
   }, {
   collection: 'albums'
});
   
module.exports = mongoose.model('Album', AlbumSchema);