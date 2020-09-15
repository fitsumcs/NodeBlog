const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const blogrouter = require('./routes/blogroutes');
const app = express();

const dbUrl = process.env.DATABASE_URL || "mongodb://localhost/blog";

const port = process.env.PORT || 3000;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

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
// schema 
const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    body: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(blogrouter);




app.listen(port, () => { console.log("Server has Started "); });