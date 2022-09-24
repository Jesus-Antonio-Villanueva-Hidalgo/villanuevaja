const express = require('express')
const cors = require('cors')
var morgan = require('morgan')

var fs = require('fs')
var path = require('path')

const app = express()
const port = 3002

app.use(cors({origin:"http://localhost"}))
app.use(express.text())
app.use(express.json())

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

/*app.use((req,res,next)=>{
    console.log('esta es una funcion middleware')
    next()
},(resq,res,next)=>{
    console.log('esta es una segunda funcion middleware')
    next()
});*/

app.post('/',(req,res)=>{
    //res.send('Respondiendo a una peticion POST')
    //res.json(usuario: 'Jesus')
});

app.get('/',(req,res)=>{
    //res.send('Respondiendo a una peticion GET en EXPRESS')
    res.sendFile('./static/index.html',{root:__dirname},(err)=>(console.log('Archivo enviado')))
});

app.post('/texto', (req,res) => {
    console.log(req.body)
    let may = req.body.toUpperCase()
    let sinesp = req.body.trim()
    let longi = req.body.length
    res.json(
        {mayusculas: may,
            sinespacios: sinesp,
            longitud: longi}
    )
});

app.post('/json',(req,res)=>{
    console.log(req.body.nombre)
    let cadena = "Hola"+req.body.nombre+" "+req.body.apellido+" ¿como estas?"
    res.json({saludo:cadena})
});

app.get('/mayusculas/:cadena',(req,res)=>{
    console.log(req.params)
    res.send(res.params)
});

app.get('/suma',(req,res)=>{
    console.log(req.query)
    let suma = parseInt(req.query.x)+parseInt(req.query.y)
    res.send(`La suma es: ${suma}`)
});

app.use((req,res)=>{
    res.status(404).sendFile('./static/404.html',{root:__dirname})
});

app.listen(port,()=>{
    console.log('La aplicacion esta en linea!')
    console.log(__dirname)//donde estoy
    console.log(__filename)//nombre del archivo
})