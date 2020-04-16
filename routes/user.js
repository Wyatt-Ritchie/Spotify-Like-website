var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();

api.post('/processRegistration:username?:password?', UserController.processRegistration);
api.post('/login:username?:password?', UserController.processLogin);
api.post('/upgradeToPremium', UserController.upgradeToPremium);
api.post('/addOrRemoveSong:songname?', UserController.addOrRemoveSong);
api.get('/isSongLiked:songname?:artistname?', UserController.isSongLiked);
api.get('/isLoggedIn', UserController.isLoggedIn);
api.get('/isPremium', UserController.isPremium);
api.post('/logout', UserController.logout);


module.exports = api;