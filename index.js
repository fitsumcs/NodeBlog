require('./DB/connection');
const express = require('express');
const body_parser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const blogrouter = require('./routes/blogroutes');
const app = express();

const port = process.env.PORT || 3000;


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


app.use(blogrouter);


app.listen(port, () => { console.log("Server has Started "); });