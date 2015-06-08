var mysql = require('mysql');
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'stocks',
    }
);

var selectuser = function (login, password, callback){
  var queryString = 'SELECT id, login, password, access from user WHERE login = "'+ login + '"';
	connection.query(queryString, function(err, rows, fields) {
    callback(rows[0]);
});
};
exports.selectuser = selectuser;

var lsproduit = function (avion, callback){
  var queryString = 'SELECT qte.qte, produits.nom from qte, produits WHERE qte.idproduits = produits.idproduits AND qte.idavion = "'+ avion + '"';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.lsproduit = lsproduit;

var produits = function (callback){
  var queryString = 'SELECT idproduits, nom, prix from produits';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.produits = produits;

var lsavions = function (callback){
  var queryString = 'SELECT id, avion.idaeroport, type, immatriculation, nom from avion, aeroport WHERE avion.idaeroport = aeroport.idaeroport ';
  connection.query(queryString, function(err, rows, fields) {
        console.log(rows);
    callback(rows);
});
};
exports.lsavions = lsavions;

var lsproduitae = function (aeroport, callback){
  var queryString = 'SELECT qteaeroport.qte, produits.nom from qteaeroport, produits WHERE qteaeroport.idproduits = produits.idproduits AND qteaeroport.idaeroport = "'+ aeroport + '"';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.lsproduitae = lsproduitae;

var lsproduitav = function (avionid, callback){
  var queryString = 'SELECT qte.qte, produits.nom from qte, produits WHERE qte.idproduits = produits.idproduits AND qte.idavion = "'+ avionid + '"';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.lsproduitav = lsproduitav;

var lsaeroports = function (callback){
  var queryString = 'SELECT idaeroport, nom, pays, ville from aeroport';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.lsaeroports = lsaeroports;

var infoaeroport = function (aeroport, callback){
  var queryString = 'SELECT idaeroport, nom, pays, ville from aeroport WHERE idaeroport = "'+ aeroport + '"';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.infoaeroport = infoaeroport;

var infoavion = function (avionid, callback){
  var queryString = 'SELECT id, avion.idaeroport, type, immatriculation, nom from avion, aeroport WHERE avion.idaeroport = aeroport.idaeroport AND avion.id = "'+ avionid + '" ';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.infoavion = infoavion;

var afficheruser = function (callback){
  var queryString = 'SELECT id, login from user';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.afficheruser = afficheruser;

var ajoutuser = function (loginajouter, passwordajouter, access, callback){
  var queryString = 'INSERT INTO user (login, password, access) VALUES ("'+ loginajouter +'", "'+ passwordajouter +'", "'+ access +'");';
	connection.query(queryString, function(err, fields) {
    if (err) {
    var msg = 'il y a une erreur';
    callback(msg);
    }
    else {
    var msg = 'Done';
    callback(msg);
    }
});
};
exports.ajoutuser = ajoutuser;

var ajouterproduit = function (nomproduit, prixproduit, callback){
    var queryString = 'INSERT INTO produits (nom, prix) VALUES ("'+ nomproduit + '", "'+ prixproduit + '");';
    connection.query(queryString, function(err, fields) {});
};
exports.ajouterproduit = ajouterproduit;

var ajouteravion = function (idaeroport, typeavion, immatriculation, callback){
    var queryString = 'INSERT INTO avion (idaeroport, type, immatriculation) VALUES ("'+ idaeroport + '", "'+ typeavion + '", "'+ immatriculation + '");';
    connection.query(queryString, function(err, fields) {});
};
exports.ajouteravion = ajouteravion;

var ajouteraeroport = function (nom, pays, ville, callback){
    var queryString = 'INSERT INTO aeroport (nom, pays, ville) VALUES ("'+ nom + '", "'+ pays + '", "'+ ville + '");';
    connection.query(queryString, function(err, fields) {});
};
exports.ajouteraeroport = ajouteraeroport;

var ajoutqte = function (nombre, idduproduit, idaeroport, callback){
      var queryString = 'SELECT COUNT(*) AS namesCount FROM qteaeroport WHERE idaeroport = "'+ idaeroport + '" AND idproduits = "'+ idduproduit + '"';
  connection.query(queryString, function(err, rows, fields) {
    if (rows[0].namesCount == 1) {
    var queryString = 'SELECT qte from qteaeroport WHERE idaeroport = "'+ idaeroport + '" AND idproduits = "'+ idduproduit + '"';
    connection.query(queryString, function(err, rows, fields) {
    var temp = parseFloat(rows[0].qte) + parseFloat(nombre);
    var queryString = 'UPDATE qteaeroport SET qte = "'+ temp + '" WHERE idaeroport = "'+ idaeroport + '" AND idproduits = "'+ idduproduit + '";';
    connection.query(queryString, function(err, fields) {});
    });
    };
    if (rows[0].namesCount == 0) {
    var queryString = 'INSERT INTO qteaeroport (idaeroport, idproduits, qte) VALUES ("'+ idaeroport + '", "'+ idduproduit + '", "'+ nombre + '");';
    connection.query(queryString, function(err, fields) {});
    };
  });
};
exports.ajoutqte = ajoutqte;

var ajoutqteav = function (nombre, idduproduit, idavion, idaeroport, callback){
    var queryString = 'SELECT COUNT(*) AS namesCount FROM qteaeroport WHERE idaeroport = "'+ idaeroport + '" AND idproduits = "'+ idduproduit + '"';
  connection.query(queryString, function(err, rows, fields) {
    if (rows[0].namesCount == 1) {
    var queryString = 'SELECT qte from qteaeroport WHERE idaeroport = "'+ idaeroport + '" AND idproduits = "'+ idduproduit + '"';
    connection.query(queryString, function(err, rows, fields) {
    var temp = parseFloat(rows[0].qte) - parseFloat(nombre);
    var queryString = 'UPDATE qteaeroport SET qte = "'+ temp + '" WHERE idaeroport = "'+ idaeroport + '" AND idproduits = "'+ idduproduit + '";';
    connection.query(queryString, function(err, fields) {});
    });
    };
    if (rows[0].namesCount == 0) {
    var temp2 = 0 - parseFloat(nombre);
    var queryString = 'INSERT INTO qteaeroport (idaeroport, idproduits, qte) VALUES ("'+ idaeroport + '", "'+ idduproduit + '", "'+ temp2 + '");';
    connection.query(queryString, function(err, fields) {});
    };
  });
  var queryString = 'SELECT COUNT(*) AS namesCountt FROM qte WHERE idavion = "'+ idavion + '" AND idproduits = "'+ idduproduit + '"';
  connection.query(queryString, function(err, rows, fields) {
    if (rows[0].namesCountt == 1) {
    var queryString = 'SELECT qte from qte WHERE idavion = "'+ idavion + '" AND idproduits = "'+ idduproduit + '"';
    connection.query(queryString, function(err, rows, fields) {
    var temp3 = parseFloat(rows[0].qte) + parseFloat(nombre);
    var queryString = 'UPDATE qte SET qte = "'+ temp3 + '" WHERE idavion = "'+ idavion + '" AND idproduits = "'+ idduproduit + '";';
    connection.query(queryString, function(err, fields) {
    });
    });
    };
    if (rows[0].namesCountt == 0) {
    var temp2 = 0 + parseFloat(nombre);
    var queryString = 'INSERT INTO qte (idavion, idproduits, qte) VALUES ("'+ idavion + '", "'+ idduproduit + '", "'+ temp2 + '");';
    connection.query(queryString, function(err, fields) {});
    };
});
};
exports.ajoutqteav = ajoutqteav;

var deletuser = function (useradelet, callback){
  var queryString = 'DELETE FROM user WHERE id='+ useradelet + '';
  connection.query(queryString, function(err, fields) {
  if (err) {
    var msg = 'il y a une erreur';
    callback(msg);
  }
  else {
    var msg = 'Done';
    callback(msg);
  }
});
};
exports.deletuser = deletuser;