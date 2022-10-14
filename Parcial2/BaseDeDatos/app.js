let mysql = require('mysql')
let fs = require('fs')
let j2xls = require('json2xls')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'world'
  });
   
  connection.connect();
   
  // connection.query('SELECT * FROM city', function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results);

    //var xls = j2xls(results);
    //fs.writeFileSync(`${__dirname}/Excel/data.xlsx`,xls,'binary')
  //});
  connection.query('SELECT * FROM `city` WHERE `Countrycode` = ?','MEX',function(error,results,fields){
    if (error) throw error;
    console.log(results);
    var xls = j2xls(results);
    fs.writeFileSync(`${__dirname}/Excel/data.xlsx`,xls,'binary')
  });
  connection.end();