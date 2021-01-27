const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kimk7797",
  database: "movieapp",
});

connection.connect();

connection.query("SELECT * FROM comments", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();
