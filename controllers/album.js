
var Album = require('../models/album');

function getAlbums(req, res) {
 
  var artistName = req.query.artist;
  console.log("Getting albums");
  console.log(artistName);
  if(!artistName){
    // Get all albums

    Album.find({}).then(function(albums) {
      console.log("Albums found:")
      console.log(albums);
      res.status(200).send({albums});

    }).catch(function(error) {
      console.log(error);
    });

  } else {
    //Get artist's albums
    Album.find({'artist.name': artistName}).then(function(albums) {
      console.log("Albums found:")
      console.log(albums);
      res.status(200).send({albums});
    }).catch(function(error) {
      console.log(error);
    });
  }
}

module.exports = {
  getAlbums
}