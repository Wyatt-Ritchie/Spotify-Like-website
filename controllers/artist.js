
var Artist = require('../models/artist');

function getArtist(req, res){
   var artistName = req.query.name;
   console.log("Getting artist")
   Artist.find({name : artistName}).then(function(results) {
      if (results.length != 1) {
         console.log('login: no artist found');
      } else {
         console.log('artist found');
         res.status(200).send({results});
      }
   }).catch(function(error) {
      console.log(error);

   });
 }

 function getArtists(req, res) {
 
   var page = parseInt(req.query.page) || 0;
   var itemsPerPage = parseInt(req.query.limit) || 3;
   var query = {};
   Artist.find(query)
      .sort({ update_at: -1 })
      .skip(page * itemsPerPage) 
      .limit(itemsPerPage)
      .exec((err, result) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      Artist.countDocuments(query).exec((count_error, count) => {
         if (err) {
            return res.json(count_error);
         }

         return res.json({
            total: count,
            page: page,
            artists: result
         });
      });
   });
}

module.exports = {
   getArtist,
   getArtists,
 }