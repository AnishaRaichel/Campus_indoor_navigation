const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",  // Update if your password is different
  database: "campus_navigation",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});


// Get all locations
app.get("/locations", (req, res) => {
  connection.query("SELECT id, name, x_coordinate, y_coordinate FROM locations", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Get graph edges
app.get("/edges", (req, res) => {
    connection.query(
      "SELECT id, from_location, to_location, distance FROM edges",
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(results);
        }
      }
    );
  });  

app.listen(5000, () => console.log("Server running on port 5000"));