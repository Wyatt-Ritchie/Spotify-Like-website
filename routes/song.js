var express = require('express');
var SongController = require('../controllers/song');
var api = express.Router();

api.get('/song/:name?', SongController.getSong);
api.get('/songs/:page?:album?:artist?', SongController.getSongs);
api.get('/recommendedSongs', SongController.getRecommendSongs);
api.get('/favouriteSongs', SongController.getFavouriteSongs);
api.get('/topSongs', SongController.getTopSongs);
api.get('/newSongs', SongController.getNewSongs);

module.exports = api;