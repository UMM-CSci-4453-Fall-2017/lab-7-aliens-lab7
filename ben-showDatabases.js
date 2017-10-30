var credentials = require('./credentials.json');
var mysql = require('mysql');

credentials.host="ids.morris.umn.edu";

var connection = mysql.createConnection(credentials);

connection.connect(function(err){
  if (err) {
    console.log("aww crap an error \n");
    console.log(err);
  } else {
    console.log("no errors, connection established \n");
  }
});

var query = connection.query('SHOW DATABASES');
var data = [];
query.on('error', function(err) {
  console.log("Couldnt't find any databases, error! \n");
  connection.close();
}).on('result', function(row) {
  data.push(row);
}).on('end', function() {
  console.log("Found a whole bunch of databases: \n");
  console.log(data);
  connection.end();
  console.log("Connection closed, we're all done here. \n");
});
