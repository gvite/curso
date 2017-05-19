'user strict'

var express = require('express');

var ArtistController = require('../controllers/artist');
var md_auth = require('../middlewares/autenticated');
var api = express.Router();
var role = require('../services/jwt');

api.post("/artist/insert" ,role.isAdmin, ArtistController.save);
api.post("/artist/update/:_id",role.isAdmin , ArtistController.update);

module.exports = api;