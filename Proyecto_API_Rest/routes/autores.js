import { Router } from "express";
import { pool } from "../db.js";

//const express = require('express')
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Autor:
 *       type: object
 *       required:
 *         - Autor_Id
 *         - Nombre
 *         - Pais
 *       properties:
 *         Autor_Id:
 *           type: int
 *           description: El id autoincrementable del autor.
 *         Nombre:
 *           type: string
 *           description: El nombre del autor.
 *         Pais:
 *           type: string
 *           description: Pais de origen del autor.
 *       example:
 *         Autor_Id: 15
 *         Nombre: Francisco Monchón
 *         Pais: España
 *       
 */

/**
 * @swagger
 * tags:
 *   name: Autores
 *   description: API para administrar los autores de los libros.
 */

/**
 * @swagger
 * /autores:
 *   get:
 *     summary: Regresa una lista de todos los autores.
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de los autores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autor'
 * 
 */

router.get('/',async (req,res)=>{
    const [responseDB] = await pool.execute(`SELECT * FROM autor`)
    res.send(responseDB)
    
});

/**
 * @swagger
 * /autores/{id}:
 *   get:
 *     summary: Obtiene el autor por su id.
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del autor.
 *     responses:
 *       200:
 *         description: Encontro el autor.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 *       400:
 *         description: El autor no fue encontrado.
 */

router.get('/:id',async(req,res)=>{
   const id = req.params.id;
   const [responseBD]= await pool.execute(`SELECT * FROM autor WHERE Autor_Id =${id}`)
     res.json(responseBD)
     
 });

/**
 * @swagger
 * /autores:
 *   post:
 *     summary: Crea un nuevo autor.
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Autor'
 *     responses:
 *       200:
 *         description: El autor fue creado exitosamente.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 *       500:
 *         description: Error en el servidor.
 */

router.post('/', async (req,res)=>{
   const {Nombre,Pais} = req.body;
   const [responseBD]= await pool.execute(`INSERT INTO autor (Nombre,Pais) VALUES ('${Nombre}','${Pais}')`)
     res.json('Insertado correctamente')
     res.status(responseBD)
     
});

/**
 * @swagger
 * /autores:
 *   put:
 *     summary: Actualiza un autor por su id.
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Autor'
 *     responses:
 *       200:
 *         description: El autor fue actualizado exitosamente.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 *       500:
 *         description: Error en el servidor.
 */

router.put('/',async(req,res)=>{
   
   const {Autor_Id,Nombre,Pais} = req.body;
   await pool.execute(`UPDATE autor SET Nombre='${Nombre}',Pais='${Pais}' WHERE Autor_Id='${Autor_Id}'`)
     res.json('Actualizado correctamente')
 });

/**
 * @swagger
 * /autores/{id}:
 *   delete:
 *     summary: Elimina el autor por su id.
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del autor.
 *     responses:
 *       200:
 *         description: El autor fue eliminado.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 *       400:
 *         description: El autor no fue encontrado.
 */

 router.delete('/:id',async(req,res)=>{
   const id = req.params.id;
   await pool.execute(`DELETE FROM autor WHERE Autor_Id =${id}`)
     res.json('Eliminado correctamente')
     
 });

export default router
