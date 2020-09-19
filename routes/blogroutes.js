const express = require('express');
const Blog = require('../Models/blogModel');
const { isLogged, checkOwner } = require('../middleware');


// router 
const blogrouter = new express.Router();

// Routes 
blogrouter.get('/', (req, res) => {
    res.redirect('/blogs');
});
// All Blogs
blogrouter.get('/blogs', (req, res) => {
    Blog.find().sort({ created: -1 }).exec((error, blogs) => {
        if (error) {

            console.log("Some Internal Error ");

        } else {
            res.render('index', { blogs });
        }
    });
});
// New Blog form route 
blogrouter.get('/blogs/new', isLogged, (req, res) => {
    res.render('new');

});

// create a post 
blogrouter.post('/blogs', isLogged, (req, res) => {

    req.body.blog.body = req.sanitize(req.body.blog.body);
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    req.body.blog.author = author;

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
blogrouter.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {

        if (error) {
            res.redirect("/blogs");

        } else {
            res.render("detail", { blog });
        }


    });
});

// Edit form 
blogrouter.get('/blogs/:id/edit', checkOwner, (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {

        if (error) {
            res.redirect("/blogs");

        } else {
            res.render("edit", { blog });
        }


    });

});

// update route 
blogrouter.put('/blogs/:id', checkOwner, (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (error, blog) => {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });

});

// delete route 
blogrouter.delete('/blogs/:id', isLogged, (req, res) => {

    Blog.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });


});


module.exports = blogrouter;