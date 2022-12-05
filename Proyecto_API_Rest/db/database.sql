/*Base de datos MYSQL utilizada */
CREATE DATABASE IF NOT EXISTS libreria;
USE libreria;
CREATE TABLE Autor (
    Autor_Id INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(70) NOT NULL,
    Pais VARCHAR(60) NOT NULL,
    PRIMARY KEY(Autor_Id)
);

INSERT INTO Autor
    (Nombre, Pais)
VALUES
    ('J.D. Salinger', 'USA'),
    ('F. Scott. Fitzgerald', 'USA'),
    ('Jane Austen', 'UK'),
    ('Scott Hanselman', 'USA'),
    ('Jason N. Gaylord', 'USA'),
    ('Pranav Rastogi', 'India'),
    ('Todd Miranda', 'USA'),
    ('Christian Wenz', 'USA'),
    ('Eduardo Lanata','Mexico'),
    ('Fernando Reyes Cortez','Mexico')
;

CREATE TABLE Libro (
    Libro_Id INT NOT NULL AUTO_INCREMENT,
    Titulo VARCHAR(70) NOT NULL,
    Editorial VARCHAR(50),
    Año_Edicion VARCHAR(4) NOT NULL,
    Paginas SMALLINT NOT NULL,
    Idioma VARCHAR(30) NOT NULL,
    Categoria VARCHAR(50) NOT NULL,
    PRIMARY KEY(Libro_Id)
);

INSERT INTO Libro
    (Titulo,Editorial,Año_Edicion,Paginas,Idioma,Categoria)
VALUES
    ('The Catcher in the Rye','Little Brown and Company','1991','240','Ingles','Literatura y linguistica'),
    ('Nine Stories','Little Brown and Company','1991','208','Ingles','Literatura y linguistica'),
    ('Franny and Zooey','Little Brown and Company','1991','176','Ingles','Literatura y linguistica'),
    ('The Great Gatsby','Scribner Book Company','1996','240','Ingles','Literatura y linguistica'),
    ('Tender id the Night','WORDSWORTH CLASSICS','1995','324','Ingles','Literatura y linguistica'),
    ('Pride and Prejudice','Dover Publications','1995','272','Ingles','Literatura y linguistica'),
    ('Professional ASP.NET 4.5 in C# and VB','Wrox','2013','1440','Ingles','Tecnico'),
    ('Atlas de operatoria dental','Alfaomega','2017','456','Español','Cientifico'),
    ('INTELIGENCIA ARTIFICIAL APLICADA A ROBÓTICA Y AUTOMATIZACIÓN','Alfaomega','2021','384','Español','Tecnico')
;

CREATE TABLE Libro_Autor (
    Libro_Id  INT NOT NULL,
    Autor_Id INT NOT NULL,
    FOREIGN KEY (Autor_Id) REFERENCES Autor(Autor_Id),
    FOREIGN KEY (Libro_Id) REFERENCES Libro(Libro_Id)
);

INSERT INTO Libro_Autor
    (Libro_Id, Autor_Id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 2),
    (6, 3),
    (7, 4),
    (7, 5),
    (7, 6),
    (7, 7),
    (7, 8),
    (8, 9),
    (9, 10)
;