const http=require("http");

const servidor = http.createServer((req,res)=>{
    res.end("Servidor de HTTP de NodeJS respondiendo")
});

servidor.listen(8080,()=>{
    console.log("Servidor corriendo y escuchando en puerto 8080")
});