const mongoose = require('mongoose');
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
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        },
        username: String

    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;