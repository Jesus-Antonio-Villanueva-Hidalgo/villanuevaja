let mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'world'
  });

connection.connect((error)=>{
  if(error){
    console.log("el error de conexion es: "+error)
    return
  }
  console.log("CONEXION EXITOSA")
});

module.exports = connection;