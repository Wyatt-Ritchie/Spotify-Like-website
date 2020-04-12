var express = require('express');
var ArtistController = require('../controllers/artist');
var api = express.Router();


api.get('/artist/:name?', ArtistController.getArtist);
api.get('/artists/:page?', ArtistController.getArtists);

module.exports = api;
