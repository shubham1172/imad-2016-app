var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
	user: 'postgres',
	database: 'postgres',
	host: 'localhost',
	port: '5432',
	password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config)

app.get('/test-db', function (req, res) {
	pool.query('SELECT * FROM test.test', function(err,results){
		if(err){
			res.status(500).send(err.toString());
		} else {
			res.send(JSON.stringify(results.rows));
		}
	});
});
var data = [];
app.get('/submit-data', function (req, res) { //link: /submit-data/?data=data
	var dataX = req.query.data;
	data.push(dataX);
	res.send(JSON.stringify(data));
});

app.get('/ui/refresh.js', function(req, res){
	res.sendFile(path.join(__dirname, 'ui', 'refresh.js'));
});

app.get('/get-data', function (req, res) {
	console.log(JSON.stringify(data));
    res.send(JSON.stringify(data));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/profile.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.png'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
 });
 
 app.get('/ui/main.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
  });
  
 app.get('/ui/chat.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'chat.js'));
  });
  
 app.get('/chat-thread', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'chat-thread.html'));
  });
 

 var counter = 0;
 app.get('/counter', function(req, res) {
   counter = counter + 1;
   res.send(counter.toString());
  });
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log('IMAD course app listening on port 8080!');
  console.log('An app by Shubham Sharma');
  console.log('~shubhamsharma1172@gmail.com');
});
