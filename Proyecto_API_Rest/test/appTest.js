import chai from 'chai';
import chaiHttp from 'chai-http'
import { expect } from 'chai';


chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe("API Libros",()=>{

  describe("GET /libros", () => {
    it("Deberia obtener todos los libros", (done) => {
      chai
        .request(url)
        .get("/libros")
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("GET /libros/:id", () => {
    it("Deberia obtener un libro por su ID", (done) => {
      const id = 1;
      chai
        .request(url)
        .get("/libros/"+id)
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          /*expect(res).to.be.a('object');
          expect(res).to.have.property('Libro_Id');
          expect(res).to.have.property('Titulo');
          expect(res).to.have.property('Año_Edicion');
          expect(res).to.have.property('Paginas');
          expect(res).to.have.property('Idioma');
          expect(res).to.have.property('Categoria');*/
          done();
        });
    });
  });

  describe("GET /libros/mayorpag", () => {
    it("Deberia obtener el libro con el mayor numero de paginas", (done) => {
      chai
        .request(url)
        .get("/libros/mayorpag")
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          /*expect(res).to.be.a('object');
          expect(res).to.have.property('Libro_Id');
          expect(res).to.have.property('Titulo');
          expect(res).to.have.property('Año_Edicion');
          expect(res).to.have.property('Paginas');
          expect(res).to.have.property('Idioma');
          expect(res).to.have.property('Categoria');*/
          done();
        });
    });
  });

  describe("POST /libros", () => {
    it("Deberia insertar un libro", (done) => {
      let libro ={
        Titulo: "APRENDER ARDUINO, ELECTRÓNICA Y PROGRAMACIÓN - Con 100 ejercicios prácticos",
        Editorial:"Alfaomega",
        Año_Edicion: "2018",
        Paginas: 216,
        Idioma: "Español",
        Categoria: "Tecnico"
      }
      chai
        .request(url)
        .post("/libros")
        .send(libro)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("PUT /libros", () => {
    it("Deberia actualizar un libro", (done) => {
      let libro ={
        Libro_Id: 26,
        Titulo: "APRENDER ARDUINO, ELECTRÓNICA Y PROGRAMACIÓN - Con 100 ejercicios prácticos",
        Editorial:"Alfaomega",
        Año_Edicion: "2018",
        Paginas: 254,
        Idioma: "Español",
        Categoria: "Tecnico"
      }
      chai
        .request(url)
        .put("/libros")
        .send(libro)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("DELETE /libros/:id", () => {
    it("Deberia eliminar un libro por su ID", (done) => {
      const id = 27;
      chai
        .request(url)
        .delete("/libros/"+id)
        .send()
        .end(function (err, res) {
          //expect(res).to.equal('Eliminado correctamente');
          done();
        });
    });
  });

});

describe("API Autores",()=>{

  describe("GET /autores", () => {
    it("Deberia obtener todos los autores", (done) => {
      chai
        .request(url)
        .get("/autores")
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("GET /autores/:id", () => {
    it("Deberia obtener un autor por su ID", (done) => {
      const id = 1;
      chai
        .request(url)
        .get("/autores/"+id)
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("POST /autores", () => {
    it("Deberia insertar un autor", (done) => {
      let autor ={
        Nombre: "Nombre Prueba",
        Pais: "Costa Rica"
      }
      chai
        .request(url)
        .post("/autores")
        .send(autor)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.a('object');
          done();
        });
    });
  });

  describe("PUT /autores", () => {
    it("Deberia actualizar un autor", (done) => {
      let autor ={
        Autor_Id: 15,
        Nombre: "Nombre Prueba",
        Pais: "Peru"
      }
      chai
        .request(url)
        .put("/autores")
        .send(autor)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.a('object');
          done();
        });
    });
  });

  describe("DELETE /autores/:id", () => {
    it("Deberia eliminar un autor por su ID", (done) => {
      let id = 14;
      chai
        .request(url)
        .delete("/autores/"+id)
        .send()
        .end(function (err, res) {
          
          done();
        });
    });
  });

});

describe("API Libro_Autores",()=>{

  describe("GET /libro_autores", () => {
    it("Deberia obtener las relaciones entre los libros y sus autores", (done) => {
      chai
        .request(url)
        .get("/libro_autores")
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("GET /libro_autores/libro/:id", () => {
    it("Deberia obtener todos los autores de un libro", (done) => {
      let id = 7;
      chai
        .request(url)
        .get("/libro_autores/libro/"+id)
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("GET /libro_autores/autor/:id", () => {
    it("Deberia obtener todos los libros de un autor", (done) => {
      let id = 1;
      chai
        .request(url)
        .get("/libro_autores/libro/"+id)
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

});