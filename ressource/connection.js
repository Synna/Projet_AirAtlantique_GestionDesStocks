var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'null',
  database : 'gestiondesstocks'
});

var selectuser = function (login, password){
	connection.connect();
  var queryString = 'SELECT * from membres';
	connection.query(queryString, function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

	connection.end();
};

exports.selectuser = selectuser;