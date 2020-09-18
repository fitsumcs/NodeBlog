const mongoose = require('mongoose');

const dbUrl = process.env.DATABASE_URL || "mongodb://localhost/blog";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });