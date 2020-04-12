require("../models/user");
require("../models/song");
require("../models/album");
require("../models/artist");

let mongoose = require('mongoose');

// database schemas
var userSchema = mongoose.model('User').schema
var songSchema = mongoose.model('Song').schema
var albumSchema = mongoose.model('Album').schema
var artistSchema = mongoose.model('Artist').schema

// Models
let User = mongoose.model('User', userSchema);
let Song = mongoose.model('Song', songSchema);
let Album = mongoose.model('Album', albumSchema);
let Artist = mongoose.model('Artist', artistSchema);

mongoose.connect('mongodb://localhost:27017/MusicPlayer', {
      useNewUrlParser: true
   },
   function(error) {
      if (error) {
         return console.error('Unable to connect:', error);
      }
   });
mongoose.set('useCreateIndex', true);

//User.collection.drop();
Artist.collection.drop();
Song.collection.drop();
Album.collection.drop();

// ARTISTS //

artist1 = new Artist({
    name : "Lewis Capaldi"
});

artist2 = new Artist({
    name : "The Weeknd"
});

artist3 = new Artist({
    name : "Lil Nas X"
});

artist4 = new Artist({
    name : "Dua Lipa"
});

artist5 = new Artist({
    name : "Maroon 5"
});

artist6 = new Artist({
    name : "Post Malone"
});

artist7 = new Artist({
    name : "Tones and I"
});

// ALBUMS //

album1 = new Album({
    name : "Divinely Uninspired To A Hellish Extent",
    image : "../images/albums/Lewis_Capaldi_-_Divinely_Uninspired_to_a_Hellish_Extent.png",
    artist : artist1
});

album2 = new Album({
    name : "7 EP",
    image : "../images/albums/7EP.png",
    artist : artist3
});

album3 = new Album({
    name : "The Kids Are Coming",
    image : "../images/albums/The Kids Are Coming.jpg",
    artist : artist7
});

album4 = new Album({
    name : "Hollywood's Bleeding",
    image : "../images/albums/Hollywood's Bleeding.png",
    artist : artist6
});

album5 = new Album({
    name : "After Hours",
    image : "../images/albums/After Hours_The Weeknd.jpg",
    artist : artist2
});


// SONGS //

song1 = new Song({
    name : "Blinding Lights",
    artist : artist2,
    album : album5,
    src : "../data/songs/The Weeknd - Blinding Lights.mp3"
});

song2 = new Song({
    name : "Someone You Loved",
    artist : artist1,
    album : album1,
    src : "../data/songs/Lewis Capaldi - Someone You Loved.mp3"
});

song3 = new Song({
    name : "Don't Start Now",
    artist : artist4,
    src : "../data/songs/Dua Lipa - Don't Start Now.mp3"
});

song4 = new Song({
    name : "Panini",
    artist : artist3,
    album : album2,
    src : "../data/songs/Lil Nas X - Panini.mp3"
});

song5 = new Song({
    name : "Memories",
    artist : artist5,
    src : "../data/songs/Maroon 5 - Memories.mp3"
});

song6 = new Song({
    name : "Circles",
    artist : artist6,
    album : album4,
    src : "../data/songs/Post Malone - Circles.mp3"
});

song7 = new Song({
    name : "DANCE MONKEY",
    artist : artist7,
    album : album3,
    src : "../data/songs/TONES AND I - DANCE MONKEY.mp3"
});

allArtists = [artist1, artist2, artist3, artist4, artist5, artist6, artist7];
Artist.collection.insertMany(allArtists, artistInsertCallBack);

allAlbums = [album1, album2, album3, album4];
Album.collection.insertMany(allAlbums, albumInsertCallBack)

allSongs = [song1, song2, song3, song4, song5, song6, song7];
Song.collection.insertMany(allSongs, songInsertCallBack)

function artistInsertCallBack(err, docs) {
    if (err) {
        console.log("Artist collection insertion was failed!");
    } else {
        console.log("Success! Artists succesfully inserted")
    }
}

function albumInsertCallBack(err, docs) {
    if (err) {
        console.log("Album collection insertion was failed!");
    } else {
        console.log("Success! Albums succesfully inserted")
    }
}

function songInsertCallBack(err, docs) {
    if (err) {
        console.log("Song collection insertion was failed!");
    } else {
        console.log("Success! Songs succesfully inserted")
    }
}
