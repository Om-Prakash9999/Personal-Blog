var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 }));
var server = app.listen(8001, () => {

  var host = server.address().address;
  var port = server.address().port;
  console.log("server running at", port);
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'personal blog'
});
connection.connect(function (err) {
  if (err) throw err
  console.log('Now connected to database!')
});

//api to create a new record into mysql database


app.post('/insertpost', function (req, res) {
  var postData  = req.body;
  
  connection.query('INSERT INTO name SET ?', postData, function (error, results, fields) {
  if (error) throw error;
  res.end(JSON.stringify(results));
  });
});

//api to See All  Records  of table
app.get('/allpost', function (req, res) {
  console.log(req);
  connection.query('SELECT * from name ', function (error, results, fields) {
    if (error) throw error;
    console.log('query Completed , Record updated!')
    res.end(JSON.stringify(results));
  });
});
