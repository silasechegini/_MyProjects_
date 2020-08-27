const path = require('path');
const layout = require('express-layout');
const express = require('express');
var app = express();
var postgre = require('pg');
const bodyParser = require('body-parser');

//set port
var port = process.env.PORT || 8080
// var connection = {connectionString: process.env.DATABASE_URL || "postgres://"};
var connection = postgre.createConnection({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});


const middlewares = [
  layout(),
  express.static(path.join(__dirname)),
  bodyParser.urlencoded({ extended: true }),
];

app.use(middlewares);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.static(__dirname ));

//routes
app.get('/', function (req, res) {
    res.render("index");
});


app.post('/submit', function (req, res) {
    // Grab data from http request
    var data = {firstname: req.body.firstname,
        lastname: req.body.lastname,
        mail: req.body.mail,
        country: req.body.country,
        zipcode: req.body.zipcode,
        cityName: req.body.cityName,
        google: req.body.google,
        twitter: req.body.twitter,
        linkdin: req.body.linkdin,
        facebook: req.body.facebook,
        comm: req.body.comm
    };
    var pg = "INSERT INTO <table_name>(firstname, lastname, mail, country, zipcode, cityName, google, twitter, linkdin, facebook, comm) VALUES ('"+data.firstname+"', '"+data.lastname+"', '"+data.mail+"', '"+data.country+"', '"+data.zipcode+"', '"+data.cityName+"', '"+data.google+"', '"+data.twitter+"', '"+data.linkdin+"','"+data.facebook+"', '"+data.comm+"')";
    connection.query(pg, function (err, result) {
        if (err) throw err;
        console.log("entries inserted");
    });
    res.sendFile('index.html', { root: __dirname });        
    connection.end();  
});

app.listen(port, function(){
    console.log("app running");
})
