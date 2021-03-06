const express = require('express');
const router = express.Router();
const UserModel = require('../Models/userModel');
const passport = require('passport');
//Auth Route 
//register 
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
    const newUser = new UserModel({ firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username });
    if (req.body.password !== req.body.password2) {
        req.flash("error", "Password Does not match!!");
        return res.redirect('/register');
    }
    UserModel.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
});

//login 
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {});
//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;