import { Router } from "express";
import {pool} from '../db.js'
//const express = require('express')
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Libro:
 *       type: object
 *       required:
 *         - Titulo
 *         - Editorial
 *         - Año_Edicion
 *         - Paginas
 *         - Idioma
 *         - Categoria
 *       properties:
 *         Libro_Id:
 *           type: int
 *           description: El id autoincrementable del libro.
 *         Titulo:
 *           type: string
 *           description: El título del libro.
 *         Editorial:
 *           type: string
 *           description: Casa editorial del libro.
 *         Año_Edicion:
 *           type: string
 *           description: Año que se publicó la copia del libro.
 *         Paginas:
 *           type: smallint
 *           description: Cantidad de páginas del libro.
 *         Idioma:
 *           type: string
 *           description: Idioma en el que se encuentra el libro.
 *         Categoria:
 *           type: string
 *           description: Categoría en la que entra el libro.
 *       example:
 *         Libro_Id: 26
 *         Titulo: La biblioteca de la media noche
 *         Editorial: Alianza de Novela
 *         Año_Edicion: 2021
 *         Paginas: 336
 *         Idioma: Español
 *         Categoria: Literatura y linguistica
 *       
 */

/**
 * @swagger
 * tags:
 *   name: Libros
 *   description: API para administrar libros.
 */

/**
 * @swagger
 * /libros:
 *   get:
 *     summary: Regresa una lista de todos los libros.
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de los libros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 * 
 */

router.get('/',async (req,res)=>{
     const [responseDB] = await pool.execute(`SELECT * FROM libro`)
     res.send(responseDB)
     
});

/**
 * @swagger
 * /libros/mayorpag:
 *   get:
 *     summary: Regresa el libro que contenga la mayor cantidad de páginas.
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Libro con mayor numero de páginas..
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 * 
 */

router.get('/mayorpag',async(req,res)=>{
    const [responseDB] = await pool.execute(`SELECT * FROM libro ORDER BY Paginas DESC LIMIT 1`)
    res.send(responseDB)
})

/**
 * @swagger
 * /libros/{id}:
 *   get:
 *     summary: Obtiene el libro por su id.
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del libro.
 *     responses:
 *       200:
 *         description: Encontro el libro.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       400:
 *         description: El libro no fue encontrado.
 */

router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const [responseBD]= await pool.execute(`SELECT * FROM libro WHERE Libro_Id =${id}`)
      res.json(responseBD)
  });

/**
 * @swagger
 * /libros:
 *   post:
 *     summary: Crea un nuevo libro.
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Libro'
 *     responses:
 *       200:
 *         description: El libro fue creado exitosamente.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       500:
 *         description: Error en el servidor.
 */

router.post('/',async (req,res)=>{
    const {Titulo,Editorial,Año_Edicion,Paginas,Idioma,Categoria} = req.body;
    const [responseBD]= await pool.execute(`INSERT INTO libro (Titulo,Editorial,Año_Edicion,Paginas,Idioma,Categoria) VALUES ('${Titulo}','${Editorial}','${Año_Edicion}','${Paginas}','${Idioma}','${Categoria}')`)
      res.json('Insertado correctamente')
      res.status(responseBD)
      
});

/**
 * @swagger
 * /libros:
 *   put:
 *     summary: Actualiza un libro por su id.
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Libro'
 *     responses:
 *       200:
 *         description: El libro fue actualizado exitosamente.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       500:
 *         description: Error en el servidor.
 */

router.put('/',async(req,res)=>{
    
    const {Libro_Id,Titulo,Editorial,Año_Edicion,Paginas,Idioma,Categoria} = req.body;
    await pool.execute(`UPDATE libro SET Titulo='${Titulo}',Editorial='${Editorial}',Año_Edicion='${Año_Edicion}',Paginas='${Paginas}',Idioma='${Idioma}',Categoria='${Categoria}' WHERE Libro_Id='${Libro_Id}'`)
      res.json('Actualizado correctamente')
      
      
  });

/**
 * @swagger
 * /libros/{id}:
 *   delete:
 *     summary: Elimina el libro por su id.
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del libro.
 *     responses:
 *       200:
 *         description: El libro fue eliminado.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       400:
 *         description: El libro no fue encontrado.
 */

  router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    await pool.execute(`DELETE FROM libro WHERE Libro_Id = ${id}`)
      res.json('Eliminado correctamente')
      
  });
export default router
  //module.exports.router=router;