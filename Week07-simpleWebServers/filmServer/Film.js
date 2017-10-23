// User.js
var mongoose = require('mongoose');
var FilmSchema = new mongoose.Schema({

    title: String,
    datePublished: Date
});
mongoose.model('Film', FilmSchema);
module.exports = mongoose.model('Film');
