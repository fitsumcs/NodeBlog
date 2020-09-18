require('./DB/connection');
const express = require('express');
const body_parser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const blogrouter = require('./routes/blogroutes');
const authrouter = require('./routes/authroutes');
const User = require('./Models/userModel');
const flash = require('connect-flash');
//auth 
const passport = require('passport');
const passportLocal = require('passport-local');



const app = express();


const port = process.env.PORT || 5000;


// ejs for templet engine
app.set('view engine', 'ejs');
//static assets config 
app.use(express.static('public'));
// body parser 
app.use(body_parser.urlencoded({ extended: true }));

// sanitizer 
app.use(expressSanitizer());

// method override 
app.use(methodOverride('_method'));

//flash 
app.use(flash());

// passport config 

app.use(require('express-session')({
    secret: "here we go agin",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//current user 
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(blogrouter);
app.use(authrouter);


app.listen(port, () => { console.log("Server has Started "); });