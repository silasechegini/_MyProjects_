const express = require('express');
var app = express();
var pg = require('pg');

//set port
var port = process.env.PORT || 8080
var connection = {connectionString: process.env.DATABASE_URL || "postgres://"};
var client = new pg.Client(connection);
client.connect();

app.use(express.static(__dirname ));

//routes
app.get('/', function (req, res) {
    res.render("form.html");
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
    res.sendFile('form.html', { root: __dirname });
});

app.listen(port, function(){
    console.log("app running");
})
