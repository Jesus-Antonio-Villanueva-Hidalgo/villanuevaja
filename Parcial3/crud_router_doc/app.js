const express = require('express')

const cors = require('cors')
const ruta_ciudad = require('./rutas/router')
const app = express()
const port = 3002

app.use(cors({origin:"http://localhost"}))
app.use(express.text())
app.use(express.json())
const path = require('path')

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
  openapi: '3.0.0',
  info: {
  title: 'API Ciudades',
  version: '1.0.0',
  },
  servers:[
  {url: "http://localhost:3002"}
  ],
  },
  apis: [`${path.join(__dirname,"./rutas/router.js")}`],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use('/city',ruta_ciudad.router);

app.listen(port,()=>{
  console.log('La aplicacion esta en linea!')
  console.log(__dirname)//donde estoy
  console.log(__filename)//nombre del archivo
});
  