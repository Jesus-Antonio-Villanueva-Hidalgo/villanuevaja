const express = require('express')
let mysql = require('mysql')
let fs = require('fs')
//let j2xls = require('json2xls')
//import { pool } from './conecctionDB'
//const pool = require('./conecctionDB')
//let mysql = require('mysql')
const app = express()
const port = 3002

app.use(express.text())
app.use(express.json())


app.get('/city/:id',(req,res)=>{
  const id = req.params.id;
  let con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'world'
  })
  con.query(`SELECT * FROM city WHERE ID =${id}`,function(error,results,fields){
    res.send(results)
    if(error) throw error
  })
});

app.listen(port,()=>{
  console.log('La aplicacion esta en linea!')
  console.log(__dirname)//donde estoy
  console.log(__filename)//nombre del archivo
});
  