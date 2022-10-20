const express = require('express')
let mysql = require('mysql2')
const app = express()
const port = 3002

app.use(express.text())
app.use(express.json())

let con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'world'
})

app.get('/city/:id',(req,res)=>{
  const id = req.params.id;
  con.query(`SELECT * FROM city WHERE ID =${id}`,function(error,results,fields){
    res.send(results)
    if(error) throw error
  })
});

app.post('/city',(req,res)=>{
  const {Name,CountryCode,District,Population} = req.body;
  con.query(`INSERT INTO city (Name,CountryCode,District,Population) VALUES ('${Name}','${CountryCode}','${District}',${Population})`,function(error,results,fields){
    res.json('Insertado correctamente')
    res.status(results)
    if(error) throw error
  })
});

app.put('/city',(req,res)=>{
  const {Name,CountryCode,District,Population} = req.body;
  con.query(`UPDATE city SET Name='${Name}',CountryCode='${CountryCode}',District='${District}',Population=${Population})`,function(error,results,fields){
    res.json('Actualizado correctamente')
    res.status(results)
    if(error) throw error
  })
});

app.delete('/city/:id',(req,res)=>{
  const id = req.params.id;
  con.query(`DELETE FROM city WHERE ID =${id}`,function(error,results,fields){
    res.json('Eliminado correctamente')
    res.status(results)
    if(error) throw error
  })
});

app.listen(port,()=>{
  console.log('La aplicacion esta en linea!')
  console.log(__dirname)//donde estoy
  console.log(__filename)//nombre del archivo
});
  