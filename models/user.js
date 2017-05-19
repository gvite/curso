'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name:{type: String},
    lastname:{type: String},
    surname: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    image: {type: String}
});

module.exports = mongoose.model("User" , UserSchema);