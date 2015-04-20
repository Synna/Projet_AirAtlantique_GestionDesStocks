var reqmysql = require('./ressource/connection');
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sess;
var io = require('socket.io').listen(server);
var lsavions;
var lsproduit = '';
var lsaeroports;
app.use(session({secret: 'todotopsecret'}));
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());




app.get('/', function(req, res) {
var msg ='';
res.render('index.ejs', {msg: msg});
});

app.post('/connexion', function(req, res) {
  var login = req.body.login;
  var password = req.body.password;
  reqmysql.selectuser(login, password, function callback (result){
    try{
  if (result.login == login && result.password == password) {
    sess = req.session;
    sess.access = result.access;
    res.render('admin.ejs', {access: sess.access});
    };
    if (result.login == login && result.password != password) {
    var msg = 'Mot de passe incorrect';
    res.render('index.ejs', {msg: msg});
    };
    }
    catch(msg){
    var msg = 'Le login existe pas.';
      res.render('index.ejs', {msg: msg});
    }
  });
});

app.get('/admin', function(req, res) {
  var msg ='';
res.render('admin.ejs', {msg: msg});
});

app.get('/ajouter', function(req, res) {
res.render('ajouter.ejs');
});

app.get('/adminapplication', function(req, res) {
  var user;
reqmysql.afficheruser(function callback (result){
  user = result;
res.render('adminappli.ejs', {msg: user});
});
});

app.get('/aeroports', function(req, res) {
reqmysql.lsaeroports(function callback (result){
lsaeroports = result;
res.render('lsaeroport.ejs', {msg: lsaeroports});
});
});

app.post('/aeroportsdetail', function(req, res) {
var aeroport = req.body.aeroport;
reqmysql.lsaeroports(function callback (result){
lsaeroports = result;
reqmysql.lsproduitae(aeroport, function callback (result2){
lsproduit = result2;
reqmysql.infoaeroport(aeroport, function callback (result3){
var infoaeroport = result3;
res.render('lsaeroportdetail.ejs', {msg: lsaeroports, lsproduit: lsproduit, infoaeroport: infoaeroport});
});
});
});
});

app.post('/aeroportsgere', function(req, res) {
var aeroport = req.body.aeroport;
reqmysql.lsproduitae(aeroport, function callback (result1){
lsproduit = result1;
reqmysql.infoaeroport(aeroport, function callback (result2){
var infoaeroport = result2;
reqmysql.produits(function callback (result3){
var produits = result3;
res.render('lsaeroportgere.ejs', {lsproduit: lsproduit, infoaeroport: infoaeroport, produits: produits});
});
});
});
});

app.post('/ajouterproduit', function(req, res) {
  var nomproduit = req.body.nomproduit;
  var prixproduit = req.body.prixproduit;
  reqmysql.ajouterproduit(nomproduit, prixproduit, function callback (result){});
res.redirect('/ajouter');
});

app.post('/ajouteravion', function(req, res) {
  var idaeroport = req.body.idaeroport;
  var typeavion = req.body.typeavion;
  var immatriculation = req.body.immatriculation;
  reqmysql.ajouteravion(idaeroport, typeavion, immatriculation, function callback (result){});
res.redirect('/ajouter');
});

app.post('/ajouteraeroport', function(req, res) {
  var nom = req.body.nom;
  var pays = req.body.pays;
  var ville = req.body.ville;
  reqmysql.ajouteraeroport(nom, pays, ville, function callback (result){});
res.redirect('/ajouter');
});

app.post('/ajouterqte', function(req, res) {
  var nombre = req.body.nombre;
  var idduproduit = req.body.idduproduit;
  var idaeroport = req.body.idaeroport;
  var actions = req.body.actions
  if (actions == "Ajouter") {
  reqmysql.ajoutqte(nombre, idduproduit, idaeroport, function callback (result){});
  };
  if (actions == "Insert") {
  reqmysql.insertqte(nombre, idduproduit, idaeroport, function callback (result){});
  };
res.redirect('/aeroports');
});

app.get('/lsavions', function(req, res) {
reqmysql.lsavions(function callback (result){
lsavions = result;
res.render('lsavion.ejs', {msg: lsavions});
});
});

app.post('/aviondetail', function(req, res) {
var avion = req.body.avion;
reqmysql.lsavions(function callback (result){
lsavions = result;
reqmysql.lsproduit(avion, function callback (result2){
lsproduit = result2;
res.render('lsaviondetail.ejs', {msg: lsavions, lsproduit: lsproduit});
});
});
});

app.post('/deletuser', function(req, res) {
  var useradelet = req.body.useradelet;
  reqmysql.deletuser(useradelet, function callback (result){
  });
res.redirect('/adminapplication');
});

app.post('/ajouteruser', function(req, res) {
  var loginajouter = req.body.loginajouter;
  var passwordajouter = req.body.passwordajouter;
  var access = req.body.access;
  reqmysql.ajoutuser(loginajouter, passwordajouter, access, function callback (result){
  });
res.redirect('/adminapplication');
})
.use(express.static(__dirname + '/css'));
server.listen(8080);