var express = require('express');
var AlbumController = require('../controllers/album');

var api = express.Router();


api.get('/albums/:artist?', AlbumController.getAlbums);


module.exports = api;
