require("./models/user");
require("./models/song");
require("./models/album");
require("./models/artist");

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

artist1 = new Artist({
    name : "Lewis Capaldi"
});

artist2 = new Artist({
    name : "The Weeknd"
});

artist3 = new Artist({
    name : "Lil Nas X"
});

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

song1 = new Song({
    name : "Blinding Lights",
    artist : artist2,
    src : "../data/songs/The Weeknd - Blinding Lights.mp3"
});

song2 = new Song({
    name : "Someone You Loved",
    artist : artist1,
    album : album1,
    src : "../data/songs/Lewis Capaldi - Someone You Loved.mp3"
});

allArtists = [artist1, artist2, artist3];
Artist.collection.insertMany(allArtists, artistInsertCallBack);

allAlbums = [album1, album2];
Album.collection.insertMany(allAlbums, albumInsertCallBack)

allSongs = [song1, song2];
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
