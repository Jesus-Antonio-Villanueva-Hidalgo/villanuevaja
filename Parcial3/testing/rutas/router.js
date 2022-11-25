let mysql = require('mysql2/promise')
var express = require('express');
var router = express.Router()

let con = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'world'
  })

/**
 * @swagger
 * /city:
 *   get:
 *     tags:
 *       - city
 *     responses:
 *       200:
 *         description: Devuelve todas las ciudades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.get('/',async(req,res)=>{
   
    const id = req.params.id;
    const [responseBD]= await con.execute(`SELECT * FROM city`)
    res.json(responseBD)
  });
  
  /**
 * @swagger
 * /city/id:
 *   get:
 *     tags:
 *       - city
 *     responses:
 *       200:
 *         description: Devuelve una ciudad respecto a su ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
  router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const [responseBD]= await con.execute(`SELECT * FROM city WHERE ID =${id}`)
      res.json(responseBD)
     
  });
  
  /**
 * @swagger
 * /city:
 *   post:
 *     tags:
 *       - city
 *     responses:
 *       200:
 *         description: Inserta una ciudad con las columnas Name, CountryCode, District y Population.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
  router.post('/', async (req,res)=>{
    const {Name,CountryCode,District,Population} = req.body;
    const [responseBD]= await con.execute(`INSERT INTO city (Name,CountryCode,District,Population) VALUES ('${Name}','${CountryCode}','${District}',${Population})`)
      res.json('Insertado correctamente')
      res.status(responseBD)
      if(error) throw error
  });
  
  /**
 * @swagger
 * /city:
 *   put:
 *     tags:
 *       - city
 *     responses:
 *       200:
 *         description: Actualiza los datos de la ciudad y devuelve un json de "actualizado correctamente"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
  router.put('/',async(req,res)=>{
    const {id,Name,CountryCode,District,Population} = req.body;
    const [responseBD]= await con.execute(`UPDATE city SET Name='${Name}',CountryCode='${CountryCode}',District='${District}',Population=${Population} WHERE ID=${id}`)
      res.json('Actualizado correctamente')
      res.status(results)
      if(error) throw error
  });
  
  /**
 * @swagger
 * /city:
 *   delete:
 *     tags:
 *       - city
 *     responses:
 *       200:
 *         description: Elimina la ciudad que coincida con el ID enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
  router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    con.query(`DELETE FROM city WHERE ID =${id}`,function(error,results,fields){
      res.json('Eliminado correctamente')
      res.status(results)
      if(error) throw error
    })
  });

  module.exports.router=router;