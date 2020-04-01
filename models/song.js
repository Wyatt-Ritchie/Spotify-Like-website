var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var SongSchema = new Schema({
name: {type: String}
, link: {type: String}
, playCount: {type: Number, default: 0} // Total plays
}, {
   collection: 'songs'
});

module.exports = mongoose.model('Song', SongSchema);