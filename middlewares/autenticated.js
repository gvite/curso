'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "mean_secret_user";

exports.ensureAuth = function(req , res, next){
    var token = req.body.token || req.query.token || req.headers.authorization;
    if(token){
        token = token.replace(/['"]+/g , "");
        try{
            var payload = jwt.decode(token , secret);
            if(payload.exp <= moment().unix()){
                return res.status(401).send({message: "Token ha expirado."});
            }
        }catch(ex){
            console.log(ex);
            return res.status(403).send({message: "Token no válido"});
        }
    }else{
        return res.status(403).send({message: "No authorize"});
    }
    req.user = payload;
    next();
}