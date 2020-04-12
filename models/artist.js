var mongoose = require('mongoose')
, Schema = mongoose.Schema

var ArtistSchema = new Schema({
   name: {type: String, index: true}
   }, {
   collection: 'artists'
});
   
module.exports = mongoose.model('Artist', ArtistSchema);