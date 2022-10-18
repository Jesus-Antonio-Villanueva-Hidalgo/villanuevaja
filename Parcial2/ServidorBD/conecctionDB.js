let mysql = require('mysql')

export function pool(){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'world'
  });
  return connection
}


connection.connect((error)=>{
  if(error){
    console.log("el error de conexion es: "+error)
    return
  }
  console.log("CONEXION EXITOSA")
});
