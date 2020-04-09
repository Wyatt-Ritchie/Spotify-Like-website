var express = require('express');
var SongController = require('../controllers/song');
var api = express.Router();

api.get('/song/:name?', SongController.getSong);
api.get('/songs/:page?:album?:artist?', SongController.getSongs);


module.exports = api;