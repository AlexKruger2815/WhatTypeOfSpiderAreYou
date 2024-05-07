const express = require('express');
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('scripts'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
});

passport.use(new GitHubStrategy({
        clientID: "a013dc3b18da92da9dbe",
        clientSecret: "b4428e92c60f8938810731e9d9d6c7cdc83103cf",
        callbackURL: "http://localhost:3005/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        cb(null, profile);
    }
));

// Serve home.html as the initial page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Redirect to GitHub authentication
app.get('/auth/github', passport.authenticate('github'));

// Callback after GitHub authentication
app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });

// Serve home.html for the login route if the user is already authenticated
app.get('/login', (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(3005, () => console.log('Server is Running on port 3005'));
