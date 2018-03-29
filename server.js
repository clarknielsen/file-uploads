var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var fileUpload = require('express-fileupload');

var app = express();
var PORT = process.env.PORT || 3000;

// add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

// connect to mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "file_uploads"
});

connection.connect(function(err) {
  if (err) throw err;

  // start web server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

app.get("/", function(req, res) {
  // send html form with encoding type attr
  res.send(`
    <form method='POST' action='/' encType='multipart/form-data'>
      <input type='text' name='myName' />
      <input type='file' name='myUpload' /> 
      <input type='submit' value='Submit' /> 
    </form>
  `);
});

app.get("/images", function(req, res) {
  // get all images from db
  connection.query("SELECT * FROM images", function(err, results) {
    var html = '';

    // for each image, create an img tag
    for (var i = 0; i < results.length; i++) {
      html += `<img src="data:${results[i].type};base64,${results[i].src.toString("base64")}" alt="${results[i].name}" title="${results[i].name}" />`;
    }

    res.send(html);
  });
});

app.post("/", function(req, res) {
  // capture posted data and files
  console.log(req.body, req.files);

  // insert raw buffer data into mysql
  connection.query("INSERT INTO images SET ?", {
    name: req.body.myName,
    type: req.files.myUpload.mimetype,
    src: req.files.myUpload.data
  }, function(err) {
    if (err) throw err;

    res.redirect("/images");
  });
});