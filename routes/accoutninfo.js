const express = require('express');
const User = require('../Models/userModel');
const { isLogged } = require('../middleware');


// router 
const account_router = new express.Router();

// Routes 

// All Blogs
account_router.get('/', isLogged, (req, res) => {
    res.render("accountinfo");
});


// Edit form 
account_router.get('/:id/edit', isLogged, (req, res) => {
    res.render("editUser");

});

// update route 
account_router.put('/:id', isLogged, (req, res) => {

    User.findByIdAndUpdate(req.params.id, req.body.user, (error, user) => {
        if (error) {
            res.redirect("/account");
        } else {
            res.redirect(`/account`);
        }
    });

});

// delete route 
account_router.delete('/:id', isLogged, (req, res) => {

    User.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });


});


module.exports = account_router;