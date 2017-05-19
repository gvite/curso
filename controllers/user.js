'use strict'

var User = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
var consts = require("../config/consts");
function save(req , res){
    var user = new User();
    var params = req.body;
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = consts.ROLE_USER;
    user.image = "null";
    if(params.password){
        bcrypt.hash(params.password , null , null , function(err , hash){
            if(err){
                res.status(500).send({message: err});        
            }else{
                user.password = hash;
                user.save((err , userStored) => {
                    if(err){
                        res.status(500).send({message : "error al guardar en base"});
                    }else{
                        if(userStored){
                            res.status(200).send({status: "OK"});
                        }else{
                            res.status(401).send({message : "no se registro el usuario"});
                        }
                    }
                });
            }
        });
    }else{
        res.status(401).send({message: "Introduce Contraseña"});
    }
}
function update(req, res){
    var id = req.params._id;
    var params = req.body;
    var data = {};
    if(params.name){
        data.name = params.name;
    }
    if(params.lastname){
        data.lastname = params.lastname;
    }
    if(params.surname){
        data.surname = params.surname;
    }
    User.update({_id:id} , {$set: data} , function(err , userUpdated){
        if(err){
            res.status(500).send({message: err});
        }else if(!userUpdated){
            res.status(401).send({message: "Ocurrió un error en la actualización"});
        }else{
            res.status(200).send({message: "OK"});
        }
    });
}

function login(req , res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email:email.toLowerCase()} , (err , user) => {
        if(err || !user){
            res.status(401).send({message: "Email o contraseña no son validos."});
        }else{
            bcrypt.compare(password , user.password,(err , check) => {
                if(check){
                    var token = jwt.createToken(user);
                    res.status(200).send({
                        token: token,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: user.role
                    });
                }else{
                    res.status(401).send({message: "Email o contraseña no son validos."});
                }
            });
        }
    });
}

module.exports = {
    save,
    login,
    update
}