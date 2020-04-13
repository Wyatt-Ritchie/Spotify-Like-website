var User = require('../models/user');
var Song = require('../models/song');
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
           //console.log('login password:', bcrypt.hashSync(password));
           if (bcrypt.compareSync(password, results[0].hashedPassword)) {
              // password match - successful login
              req.session.username = username;
              req.session.save();
              console.log("Session id: ", req.session.id);
              console.log("Logged in user: ", results[0]);

              res.send(req.session);
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
            //console.log('register password:', hashedPassword);

            newUser = new User({
                username: username,
                hashedPassword: hashedPassword
            });

            newUser.save(function(error) {
                if (error) {
                    console.log(error);
                } else {
                    req.session.username = username; // logged in
                    console.log("Registered");
                    req.session.save();
                    res.send(req.session);
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

async function upgradeToPremium(req, res) {
    console.log("Session: ", req.session)
    console.log("Session id: ", req.session.id);
    console.log("Current username: ", req.session.username)
    const filter = { username: req.session.username };
    const update = { isPremium : true };
    
    await User.findOneAndUpdate(filter, update, {
        new: true
    });
}

function addSongToUser(req, res) {
    const filter = { username: req.session.username };
    console.log("Adding song to user: ", req.session.username)
    const songname = req.query.songname;
    Song.find({name : songname}).then(function(songResults) {
        if(songResults.length == 1) {
            console.log("Song found: ", songResults[0]);
            User.findOneAndUpdate(
                filter,
                { $push: { songs: songResults[0] } },
                { upsert: true }, 
                function(err, data) {
                    console.log(err);
            });
        } else {
            console.log("Song not found!");
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
    upgradeToPremium,
    addSongToUser,
    logout
  }