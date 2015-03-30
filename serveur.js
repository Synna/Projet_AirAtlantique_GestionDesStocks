var reqmysql = require('./ressource/connection');
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(session({secret: 'todotopsecret'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) { 
    res.render('index.ejs');
});

app.post('/connexion', function(req, res) {
	var login = req.body.login;
	var password = req.body.password;
	reqmysql.selectuser();
    res.render('admin.ejs');
})

.use(express.static(__dirname + '/css'))
.listen(8080);