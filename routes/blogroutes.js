const express = require('express');
const Blog = require('../Models/blogModel');
const { isLogged, checkOwner } = require('../middleware');


// router 
const blogrouter = new express.Router();

// Routes 
blogrouter.get('/', (req, res) => {
    res.redirect('/allblogs/1');
});
// All Blogs
blogrouter.get('/allblogs/:page', async(req, res) => {
    const resPerPage = 4; // results per page
    const page = req.params.page || 1; // Page
    try {


        // Find Demanded Products - Skipping page values, limit results per page
        const blogs = await Blog.find()
            .sort({ created: -1 })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage);
        // Count how many products were found
        const numOfUsers = await Blog.countDocuments();
        // Renders The Page
        res.render('index', {
            blogs: blogs,
            currentPage: page,
            pages: Math.ceil(numOfUsers / resPerPage),
            numOfResults: numOfUsers
        });

    } catch (err) {
        console.log("Some Internal Error " + err);
    }

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
            res.redirect("/");
        }

    });
});

//show single blog detail 
blogrouter.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {

        if (error) {
            res.redirect("/");

        } else {
            res.render("detail", { blog });
        }


    });
});

// Edit form 
blogrouter.get('/blogs/:id/edit', checkOwner, (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {

        if (error) {
            res.redirect("/");

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
            res.redirect("/");
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });

});

// delete route 
blogrouter.delete('/blogs/:id', isLogged, (req, res) => {

    Blog.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });


});


module.exports = blogrouter;