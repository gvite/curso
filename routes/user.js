'user strict'

var express = require('express');

var UserController = require('../controllers/user');
var md_auth = require('../middlewares/autenticated');
var api = express.Router();

api.post("/user/insert" , UserController.save);
api.post("/login" , UserController.login);
api.post("/user/update/:_id" , UserController.update);

module.exports = api;