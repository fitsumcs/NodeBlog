const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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

// Routes 
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
// All Blogs
app.get('/blogs', (req, res) => {
    Blog.find({}, (error, blogs) => {
        if (error) {

            console.log("Some Internal Eroor ");

        } else {
            res.render('index', { blogs });
        }
    });
});
// New Blog form route 
app.get('/blogs/new', (req, res) => {
    res.render('new');

});

// create a post 
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (error, blog) => {

        if (error) {
            res.render("new");
            console.log("There is Error" + error);
        } else {
            res.redirect("/blogs");
        }

    });
});

//show single blog detail 
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {

        if (error) {
            res.redirect("/blogs");

        } else {
            res.render("detail", { blog });
        }


    });
});

// Edit form 
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {

        if (error) {
            res.redirect("/blogs");

        } else {
            res.render("edit", { blog });
        }


    });

});

// update route 
app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (error, blog) => {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });

});

// delete route 
app.delete('/blogs/:id', (req, res) => {

    Blog.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });


});





app.listen(port, () => { console.log("Server has Started "); });