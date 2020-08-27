// var express = require('express');
// var app = express();

// //set port
// var port = process.env.PORT || 8080

// app.use(express.static(__dirname));

// //routes
// app.get("/", function(req, res) {
//     res.render("index");
// })

// app.listen(port, function(){
//     console.log("app running");
// })

const express = require('express');
var app = express();
var pg = require('pg');

//set port
var port = process.env.PORT || 8080
var connection = {connectionString: process.env.DATABASE_URL || "postgres://gpiasvjrgzqzvf:1bce6ce8c5d689ca2b63d90eb22b9af71eca8fa4c78114375c67152ee7c003ee@ec2-18-235-109-97.compute-1.amazonaws.com:5432/d6vm53nifu3q3m"};
var client = new pg.Client(connection);
client.connect();

app.use(express.static(__dirname ));

//routes
app.get('/', function (req, res) {
    res.render("index");
});


app.post('/submit', function (req, res) {
    // Grab data from http request
    const data = {firstname: req.body.firstname,
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
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        var pg = "INSERT INTO userdata(firstname, lastname, mail, country, zipcode, cityname, google, twitter, linkdin, facebook, comm) VALUES ('"+data.firstname+"', '"+data.lastname+"', '"+data.mail+"', '"+data.country+"', '"+data.zipcode+"', "+data.cityName+", '"+data.google+"', '"+data.twitter+"', '"+data.linkdin+"','"+data.facebook+"', '"+data.comm+"')";
        connection.query(pg, function (err, result) {
            if (err) throw err;
            console.log("table created");
        });
    });
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port, function(){
    console.log("app running");
})

// router.post('/api/v1/todos', (req, res, next) => {
//     const results = [];
//     // Grab data from http request
//     const data = {firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         mail: req.body.mail,
//         country: req.body.country,
//         zipcode: req.body.zipcode,
//         cityName: req.body.cityName,
//         google: req.body.google,
//         twitter: req.body.twitter,
//         linkdin: req.body.linkdin,
//         facebook: req.body.facebook,
//         comm: req.body.comm
//     };
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, (err, client, done) => {
//       // Handle connection errors
//       if(err) {
//         done();
//         console.log(err);
//         return res.status(500).json({success: false, data: err});
//       }
//       // SQL Query > Insert Data
//       client.query('INSERT INTO items(text, complete) values($1, $2)',
//       [data.firstname, data.lastname, data.mail,
//         data.country, data.zipcode, data.cityName,
//         data.google, data.twitter, data.linkdin,
//         data.facebook, data.comm]);
//       // SQL Query > Select Data
//       const query = client.query('SELECT * FROM items ORDER BY id ASC');
//       // Stream results back one row at a time
//       query.on('row', (row) => {
//         results.push(row);
//       });
//       // After all data is returned, close connection and return results
//       query.on('end', () => {
//         done();
//         return res.json(results);
//       });
//     });
//   });

