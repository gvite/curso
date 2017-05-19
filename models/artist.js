'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name:{type: String},
    surname: {type: String},
    description: {type: String},
    image: {type: String}
});

module.exports = mongoose.model("Artist" , ArtistSchema);