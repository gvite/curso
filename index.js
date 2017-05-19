'user strict'

var mongoose = require("mongoose");
var app = require('./app');
var port = process.env.PORT || 2171;
mongoose.connect("mongodb://localhost:27017/mean", (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("La base de datos cargada.");
        app.listen(port , () => {
            console.log("servidor escuchando en: " + port);
        });
    }
});