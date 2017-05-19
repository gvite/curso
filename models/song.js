'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = Schema({
    name:{type: String},
    number: {type: Number},
    duration: {type: String},
    file: {type: String},
    album: {type: Schema.ObjectId, ref: "Album"}
});

module.exports = mongoose.model("Song" , SongSchema);