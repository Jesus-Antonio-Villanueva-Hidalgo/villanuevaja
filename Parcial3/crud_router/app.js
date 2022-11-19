const express = require('express')

const cors = require('cors')
const ruta_ciudad = require('./router')
const app = express()
const port = 3003

app.use(cors({origin:"http://localhost"}))
app.use(express.text())
app.use(express.json())

app.use('/city',ruta_ciudad.router);

app.listen(port,()=>{
  console.log('La aplicacion esta en linea!')
  console.log(__dirname)//donde estoy
  console.log(__filename)//nombre del archivo
});
  