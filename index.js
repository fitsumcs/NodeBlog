const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

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

// Routes 
app.get('/blogs', (req, res) => {
    res.render('index');
});






app.listen(port, () => { console.log("Server has Started "); });