var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();

api.post('/processRegistration:username?:password?', UserController.processRegistration);
api.post('/login:username?:password?', UserController.processLogin);
api.post('/logout', UserController.logout);


module.exports = api;