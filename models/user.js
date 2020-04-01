var mongoose = require('mongoose')
, Schema = mongoose.Schema

let userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      index: true
   },
   hashedPassword: String
}, {
   collection: 'users'
});

module.exports = mongoose.model('User', userSchema);