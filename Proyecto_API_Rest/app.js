import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import url from 'url';
import librosRouter from './routes/libros.js'
import autoresRouter from './routes/autores.js'
import libro_autores from './routes/libro_autores.js'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({ origin: "http://localhost" }));
app.use(express.text());
app.use(express.json());

const swaggerConfig = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API LIBRERIA",
        version: "1.0.0",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
  };

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerConfig)));

app.use("/libros", librosRouter);
app.use("/autores", autoresRouter);
app.use("/libro_autores",libro_autores);

app.listen(3000, () => {
  console.log("Servidor en Linea en el puerto 3000");
  console.log(__dirname)//donde estoy
  console.log(__filename)//nombre del archivo
});
