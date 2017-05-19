'use strict'

var jwt = require('jwt-simple');

var moment = require('moment');
var consts = require("../config/consts");
var secret = "mean_secret_user";
exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30 , 'day').unix()
    }
    return jwt.encode(payload,secret);
}
exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    var payload = jwt.decode(token, {complete: true});
    if(payload.role === consts.ROLE_ADMIN) {
        next();
    } else {
        res.status(401).json({success: false, message: "Unauthorized"});
        res.end();
    }
};