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

var databases = [];
var tables = [];
var fields = [];
var dbquery = connection.query('SHOW DATABASES', function(err, rows, fields) {
  rows.forEach(function(row){
    databases.push({name: row["Database"], tables: []});
  });

  databases.forEach(function(db) {
    connection.query("SHOW TABLES IN " + db.name, function(tblerr, tblrows, tblfields) {

      tblrows.forEach(function(tbl) {
        tables.push({name: tbl["Tables_in_"+db.name], db: db.name});
      });

      var i = 1;
      tables.forEach(function(tbl) {
        connection.query("SHOW FIELDS IN " + tbl.db + "." + tbl.name, function(flderr, fldrows, fldfields) {

          fldrows.forEach(function(fld) {
            fields.push({name: fld.Field, type: fld.Type, table: tbl.name, db: tbl.db});
          });

          if (i >= tables.length) {
            var currDB = "";
            var currTBL = "";
            fields.forEach(function(field) {
              if (currDB != field.db) {
                console.log("---|"+field.db+">");
                currDB = field.db;
              }
              if (currTBL != field.table) {
                console.log("......|" + field.db + "." + field.table + ">");
                currTBL= field.table;
              }
              console.log("\tFieldName: `" + field.name + "`\t" + "(" + field.type + ")");
            });
            connection.end();
            return;
          }
          i++;

        });
      });

    });
  });

});
