var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
// console.log(path.join(__dirname, "/../../client"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.set('views', path.join(__dirname, "/../../client"));  
// app.set('view engine', 'html');
// app.use(express.static(path.join(__dirname, "/../../client")));

require('./routes.js')(app, express);

var port = process.env.PORT || 8000;
// start listening to requests on port 8000
app.listen(port);
console.log('Teacher app listening on ' + port);

// export our app for testing and flexibility, required by index.js
module.exports = app;
