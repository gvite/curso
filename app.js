'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Cargar rutas

var user_rutes = require('./routes/user');



app.use("/api" , user_rutes);

app.get("/" , (req,res) => {
    res.status(200).send({message:"Api de Música"});
});


module.exports = app;