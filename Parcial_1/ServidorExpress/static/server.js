const express = require('express')

const app = express()

const port = 3002

const cors = require('cors')
app.use(cors({origin:"http://localhost"}))

app.post('/',(req,res)=>{
    //res.send('Respondiendo a una peticion POST')
    //res.json(usuario: 'Jesus')
});

app.get('/',(req,res)=>{
    //res.send('Respondiendo a una peticion GET en EXPRESS')
    res.sendFile('./static/index.html',{root:__dirname},(err)=>(console.log('Archivo enviado')))
});

app.use((req,res)=>{
    res.status(404).sendFile('./static/404.html',{root:__dirname})
});

app.post('/json',(req,res)=>{
    console.log(req.body.nombre)
    let cadena = "Hola"+req.body.nombre+" "+req.body.apellido+" como estas"
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

app.listen(port,()=>{
    console.log('La aplicacion esta en linea!')
    console.log(__dirname)//donde estoy
    console.log(__filename)//nombre del archivo
})