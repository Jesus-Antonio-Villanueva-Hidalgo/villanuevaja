let mysql = require('mysql2/promise')
var express = require('express');
var router = express.Router()

let con = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'world'
  })

router.get('/',async(req,res)=>{
   
    const id = req.params.id;
    const [responseBD]= await con.execute(`SELECT * FROM city`)
    res.json(responseBD
      )
  });
  
  router.get('/city/:id',(req,res)=>{
    const id = req.params.id;
    con.query(`SELECT * FROM city WHERE ID =${id}`,function(error,results,fields){
      res.send(results)
      if(error) throw error
    })
  });
  
  router.post('/',(req,res)=>{
    const {Name,CountryCode,District,Population} = req.body;
    con.query(`INSERT INTO city (Name,CountryCode,District,Population) VALUES ('${Name}','${CountryCode}','${District}',${Population})`,function(error,results,fields){
      res.json('Insertado correctamente')
      res.status(results)
      if(error) throw error
    })
  });
  
  router.put('/city',(req,res)=>{
    const {id,Name,CountryCode,District,Population} = req.body;
    con.query(`UPDATE city SET Name='${Name}',CountryCode='${CountryCode}',District='${District}',Population=${Population} WHERE ID=${id}`,function(error,results,fields){
      res.json('Actualizado correctamente')
      res.status(results)
      if(error) throw error
    })
  });
  
  router.delete('/city/:id',(req,res)=>{
    const id = req.params.id;
    con.query(`DELETE FROM city WHERE ID =${id}`,function(error,results,fields){
      res.json('Eliminado correctamente')
      res.status(results)
      if(error) throw error
    })
  });

  module.exports.router=router;