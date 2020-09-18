const Blog = require('../Models/blogModel');
// exported var 
const middleware = {};
//functions 

// house ownership 
middleware.checkOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id, (err, blog) => {
            if (err) {
                //req.flash("error", "Sorry House Not Found!!");
                res.redirect('back');

            } else {
                // is he auth
                if (blog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    //req.flash("error", "Sorry Permission Denied!!");
                    res.redirect('/blogs');
                }

            }

        });

    } else {
        res.redirect('back');
    }

};
//check login
middleware.isLogged = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //req.flash("error", "Please Login!");
    res.redirect('/login');
};


module.exports = middleware;