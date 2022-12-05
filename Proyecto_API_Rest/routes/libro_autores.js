import { Router } from "express";
import {pool} from '../db.js'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Libro_Autor:
 *       type: object
 *       required:
 *         - Libro_Id
 *         - Autor_Id
 *       properties:
 *         Libro_Id:
 *           type: int
 *           description: El id del libro.
 *         Autor_Id:
 *           type: int
 *           description: El id del autor respecto al libro.
 *       example:
 *         Libro_Id: 26
 *         Autor_Id: 8
 *       
 */

/**
 * @swagger
 * tags:
 *   name: Libro_Autores
 *   description: API para administrar la relación de libros y autores.
 */

/**
 * @swagger
 * /libro_autores:
 *   get:
 *     summary: Regresa una lista de la relacion entre los id de libros y los id de autores.
 *     tags: [Libro_Autores]
 *     responses:
 *       200:
 *         description: Lista de relacion entre libros y autores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro_Autor'
 * 
 */

router.get('/',async (req,res)=>{
     const [responseDB] = await pool.execute(`SELECT * FROM libro_autor`)
     res.send(responseDB)
     
});

/**
 * @swagger
 * /libro_autores/libro/{id}:
 *   get:
 *     summary: Regresa todos los autores de un libro.
 *     tags: [Libro_Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del libro.
 *     responses:
 *       200:
 *         description: Autores del libro.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro_Autor'
 * 
 */

router.get('/libro/:id',async(req,res)=>{
    const id = req.params.id;
    const [responseDB] = await pool.execute(`SELECT autor.Autor_Id,autor.Nombre,autor.Pais FROM autor INNER JOIN libro_autor ON autor.Autor_Id = libro_autor.Autor_Id WHERE Libro_Id = ${id}`)
    res.send(responseDB)
});

/**
 * @swagger
 * /libro_autores/autor/{id}:
 *   get:
 *     summary: Devuelve todos los libros escritos por un autor.
 *     tags: [Libro_Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del autor.
 *     responses:
 *       200:
 *         description: Encontro el libro.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro_Autor'
 */

router.get('/autor/:id',async(req,res)=>{
    const id = req.params.id;
    const [responseBD]= await pool.execute(`SELECT L.Libro_Id,L.Titulo,L.Editorial,L.Año_Edicion,L.Paginas,L.Idioma,L.Categoria FROM libro L INNER JOIN libro_autor ON L.Libro_Id = libro_autor.Libro_Id WHERE Autor_Id=${id}`)
      res.json(responseBD)
  });

export default router