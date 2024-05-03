const express = require ('express');
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
var session = require('express-session')
const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    }
  }))

  
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,cb){
    cb(null,user.id);
});

passport.deserializeUser(function(id,cb){
    cb(null,id);
});

passport.use(new GitHubStrategy({
    clientID: "a013dc3b18da92da9dbe",
    clientSecret: "b4428e92c60f8938810731e9d9d6c7cdc83103cf",
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null,profile);
  }
));

const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', isAuth, (req, res) => {
  res.sendFile(__dirname + '/home.html');
});


app.get("/login",(req,res)=>{
    res.sendFile(__dirname+'/login.html');
});

//auth
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(3000,()=>console.log('Server is Running on port 3000'));