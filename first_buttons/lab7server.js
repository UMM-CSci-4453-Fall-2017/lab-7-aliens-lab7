var express=require('express'),
app = express(),
port = process.env.PORT || 1337;
var credentials = require('../../credentials.json');
var mysql = require('mysql');

// var buttons=[{"buttonID":1,"left":10,"top":70,"width":100,"label":"hotdogs","invID":1},
//             {"buttonID":2,"left":110,"top":70,"width":100,"label":"hambugers","invID":2},
//             {"buttonID":3,"left":210,"top":70,"width":100,"label":"bananas","invID":3},
//             {"buttonID":4,"left":10,"top":120,"width":100,"label":"milkduds","invID":4}]; //static buttons

credentials.host="ids.morris.umn.edu";

var connection = mysql.createConnection(credentials);

connection.connect(function(err){
  if (err) {
    console.log("aww crap an error \n");
    console.log(err);
  } else {
    console.log("no errors, db connection established \n");
  }
});

app.use(express.static(__dirname + '/public')); //Serves the web pages
app.get("/buttons",function(req,res){ // handles the /buttons API
  var buttons = [];
  connection.query("SELECT * FROM sixel004.till_buttons", function(err, rows, fields) {
    res.send(rows);
  });
});

app.listen(port);
console.log("Server started on localhost:" + port);
