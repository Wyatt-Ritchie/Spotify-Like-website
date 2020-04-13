require("./models/user");
require("./models/song");
require("./models/album");
require("./models/artist");

let express = require('express');
let app = express();

let session = require('express-session');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let uuid = require('uuid/v1');

cors = require('cors');
app.use(cors({ credentials: true, origin: true }))

var album_routes = require('./routes/album');
var artist_routes = require('./routes/artist');
var song_routes = require('./routes/song');
var user_routes = require('./routes/user');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// database config
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/MusicPlayer', {
      useNewUrlParser: true
   },
   function(error) {
      if (error) {
         return console.error('Unable to connect:', error);
      }
   });
mongoose.set('useCreateIndex', true);

// session tracking
app.use(session({
    genid: (request) => { return uuid(); },
    resave: false,
    saveUninitialized: true,
    secret: 'apollo slackware prepositional expectations',
    cookie: { secure: false, httpOnly: true },
    
}));

app.use('/api', album_routes);
app.use('/api', artist_routes);
app.use('/api', song_routes);
app.use('/api', user_routes);

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('Node.js/Express is listening on port ' + app.get('port'));
});