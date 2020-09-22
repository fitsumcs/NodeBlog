const express = require('express');
const Blog = require('../Models/blogModel');
const { isLogged } = require('../middleware');


// router 
const self_blogrouter = new express.Router();

// Routes 
self_blogrouter.get('/', isLogged, (req, res) => {
    res.redirect('/postbyme/selfblogs/1');
});
// All Blogs
self_blogrouter.get('/selfblogs/:page', isLogged, async(req, res) => {
    const resPerPage = 4; // results per page
    const page = req.params.page || 1; // Page
    try {


        // Find Demanded Products - Skipping page values, limit results per page
        const blogs = await Blog.find({ 'author.id': req.user._id })
            .sort({ created: -1 })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage);
        // Count how many products were found
        const numOfUsers = await Blog.countDocuments({ 'author.id': req.user._id });
        // Renders The Page
        res.render('postbyme', {
            blogs: blogs,
            currentPage: page,
            pages: Math.ceil(numOfUsers / resPerPage),
            numOfResults: numOfUsers
        });

    } catch (err) {
        console.log("Some Internal Error " + err);
    }

});



module.exports = self_blogrouter;