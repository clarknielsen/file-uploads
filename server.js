var express = require("express");
var bodyParser = require("body-parser");
var fileUpload = require('express-fileupload');

var app = express();
var PORT = 3000;

// add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(express.static("uploads"));

app.get("/", function(req, res) {
  // send html form with encoding type attr
  res.send(`
    <form method='POST' action='/' encType='multipart/form-data'>
      <input type='text' name='myName' />
      <input type='file' name='myUpload1' /> 
      <input type='file' name='myUpload2' /> 
      <input type='submit' value='Submit' /> 
    </form>
  `);
});

app.post("/", function(req, res) {
  // capture posted data and files
  console.log(req.body, req.files);

  // loop over all uploaded files
  for (var key in req.files) {
    // and move to uploads folder
    req.files[key].mv("./uploads/" + req.body.myName + "-" + req.files[key].name);
  }
  
	res.redirect("/");
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});