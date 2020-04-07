require("./models/user");
require("./models/song");
require("./models/album");
require("./models/artist");

let express = require('express');
let app = express();

let session = require('express-session');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let uuid = require('uuid/v1');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure out view/templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

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
//, {useMongoClient: true});
mongoose.set('useCreateIndex', true);


// database schemas
var userSchema = require('mongoose').model('User').schema
var songSchema = require('mongoose').model('Song').schema
var albumSchema = require('mongoose').model('Album').schema
var artistSchema = require('mongoose').model('Artist').schema

// Models
let User = mongoose.model('user', userSchema);
let Song = mongoose.model('song', songSchema);
let Album = mongoose.model('album', albumSchema);
let Artist = mongoose.model('artist', artistSchema);


// session tracking
app.use(session({
    genid: (request) => { return uuid(); },
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true},
    secret: 'apollo slackware prepositional expectations',
}));

app.get('/', (request, response) => {
    console.log('/ handler');
    let session = request.session;
    let username = '';
    if (session.username) {
        username = session.username;
    }
    response.render('index', {
        title: 'Main Page',
        description: 'This is the main page',
        username: username,
    });
});

app.get('/login', (request, response) => {
    response.render('login', {
        title: 'Please Sign In',
    });
});

app.post('/processLogin', (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    User.find({username: username}).then(function(results) {
        if (results.length != 1) {
           console.log('login: no user found');
           // error logging in - no such user
           response.render('login', {
              errorMessage: 'Login Incorrect'
           });
        } else {
           // user was found, now check the password
           console.log('login password:', bcrypt.hashSync(password));
           if (bcrypt.compareSync(password, results[0].hashedPassword)) {
              // password match - successful login
              request.session.username = username;
              response.render('loginSuccess', {
                 username: username,
                 title: 'Login Success'
              });
           } else {
              console.log('login: password is not a match');
              // error logging in - invalid password
              response.render('login', {
                 errorMessage: 'Login Incorrect'
              });
           }
        }
     }).catch(function(error) {
        // error logging in - no such user
        console.log('login: catch');
        response.render('login', {
           errorMessage: 'Login Incorrect'
        });
     });
});

app.get('/register', function (request, response) {
    response.render('registration', { title: 'Register' });
});

app.post('/processRegistration', function (request, response) {
    username = request.body.username;
    password = request.body.password;
    
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
                    response.render('registration',
                                    {errorMessage: 'Invalid registration data'});
                } else {
                    request.session.username = username; // logged in
                    response.render('registerConfirm', {
                    username: username,
                    title: 'Welcome aboard!'
                    });
                }
            });
         } else {
            // User is already registered
            console.log('registration: user is already registered');
            response.render('registration', {
               errorMessage: 'You are already registered. Please login.'
            });
        }
    });

    
});

app.get('/logout', function (request, response) {
    request.session.username = '';
    response.redirect('/');
});


app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('Node.js/Express is listening on port ' + app.get('port'));
});