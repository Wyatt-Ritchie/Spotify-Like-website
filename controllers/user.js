var User = require('../models/user');
let bcrypt = require('bcrypt-nodejs');
let session = require('express-session');
var express = require('express');

function processLogin(req, res){
    let username = req.query.username;
    let password = req.query.password;

    User.find({username: username}).then(function(results) {
        if (results.length != 1) {
           console.log('login: no user found');
           // error logging in - no such user
        } else {
           // user was found, now check the password
           console.log('login password:', bcrypt.hashSync(password));
           if (bcrypt.compareSync(password, results[0].hashedPassword)) {
              // password match - successful login
              req.session.username = username;

           } else {
              console.log('login: password is not a match');
              // error logging in - invalid password
           }
        }
     }).catch(function(error) {
        console.log(error);
     });
}

function processRegistration(req, res) {
    let username = req.query.username;
    let password = req.query.password;
    console.log(username);
    console.log(password);
    // Check if user is already registered
    User.find({username: username}).then(function(results) {
        // Proceed registering the user
        if (results.length != 1) {
            hashedPassword = bcrypt.hashSync(password);
            console.log('register password:', hashedPassword);

            newUser = new User({
                username: username,
                hashedPassword: hashedPassword
            });

            newUser.save(function(error) {
                if (error) {
                    console.log(error);
                } else {
                    req.session.username = username; // logged in
                }
            });
         } else {
            // User is already registered
            console.log('registration: user is already registered');
        }
    }).catch(function(error) {
        console.log(error);
     });
}

function logout(req, res) {
    req.session.username = '';
}

module.exports = {
    processLogin,
    processRegistration,
    logout
  }