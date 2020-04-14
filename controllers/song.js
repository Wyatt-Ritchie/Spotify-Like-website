var Song = require('../models/song');
var User = require('../models/user');

function getSong(req, res){
   var songName = req.query.name;
   console.log("Getting the song!")
   Song.find({name : songName}).then(function(results) {
      if (results.length != 1) {
         console.log('no song found');
      } else {
         console.log('song found');
         res.status(200).send({results});
      }
   }).catch(function(error) {
      console.log(error);

   });
 }

 function getSongs(req, res) {

   var albumName = req.query.album;
   var artistName = req.query.artist;

   // Get all songs
   if(!albumName && !artistName) {
      console.log("Getting all songs");
      var page = parseInt(req.query.page) || 0;
      var itemsPerPage = parseInt(req.query.limit) || 5;
      var query = {};
      Song.find(query)
         .sort({ update_at: -1 })
         .skip(page * itemsPerPage) 
         .limit(itemsPerPage)
         .exec((err, result) => {
         if (err) {
            console.log("ERROR WHILE RETRIEVING SONGS");
            return res.json(err);
         }
         Song.countDocuments(query).exec((count_error, count) => {
            if (err) {
               return res.json(count_error);
            }
   
            return res.json({
               total: count,
               page: page,
               songs: result
            });
         });
      });
   } else if(!albumName) {
      // Get songs by artist
      console.log("Getting songs by artist!");
      console.log(artistName);
      
      Song.find({'artist.name': artistName}).then(function(songs) {
         console.log("Songs found:")
         //console.log(songs);
         res.status(200).send({songs});
      }).catch(function(error) {
         console.log(error);
      });
   } else {
      // Get songs by album
      console.log("Getting songs by album!");
      console.log(albumName);
      
      Song.find({'album.name': albumName}).then(function(songs) {
         console.log("Songs found:")
         //console.log(songs);
         res.status(200).send({songs});
      }).catch(function(error) {
         console.log(error);
      });
   }
}

// Randomly picks 4 songs from the database
function getRecommendSongs(req, res) {
   Song.aggregate([
      {$sample: {size: 4}}
   ], function(err, results) {
      //console.log(results);
      res.json(results);
   });    
}

function getFavouriteSongs(req, res) {
   let username = req.session.username;

   //console.log("Adding or removing song. User: ", req.session.username)
   const filter = { username: req.session.username };
   User.find({username: username}).then(function(results) {
      res.json(results[0].songs);

   }).catch(function(error) {
      console.log(error);
   });

   
}

function getTopSongs(req, res) {
   Song.aggregate(
      [
          { "$sort": { "playCount": -1 } }, // Descending order
          { "$limit": 5 }
      ],
      function(err,results) {
         //console.log("results: ", result);
         res.json(results);
      }
  );
}

function getNewSongs(req, res) {
   Song.aggregate(
      [
          { "$sort": { "releaseDate": -1 } },
          { "$limit": 5 }
      ],
      function(err,results) {
         //console.log("New songs: ", results);
         res.json(results);
      }
  );
}

module.exports = {
   getSong,
   getSongs,
   getRecommendSongs,
   getFavouriteSongs,
   getTopSongs,
   getNewSongs
 }