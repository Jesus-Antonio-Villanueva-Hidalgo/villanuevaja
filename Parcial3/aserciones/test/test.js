let funciones = require('../src/funciones.js')
let chai = require('chai')
let should = chai.should();
var expect = chai.expect;
var assert = chai.assert;


describe('Pruebas de la funcion potencia',function(){
    it('Deberia regresar un numero y debe ser 8',function(){
        let resultado = funciones.potencia(2,3);
        resultado.should.be.a('number');
        resultado.should.equal(8);
    })
});

describe('Pruebas de la funcion potencia (expect)',function(){
    it('Deberia regresar un numero y debe ser 8',function(){
        let resultado = funciones.potencia(2,3);
        expect(resultado).to.be.a('number');
        expect(resultado).to.equal(8);
    })
});

describe('Pruebas de la funcion potencia (assert)',function(){
    it('Deberia regresar un numero y debe ser 8',function(){
        let resultado = funciones.potencia(2,3);
        assert.typeOf(resultado,'number');
        assert.equal(resultado,8);
    })
});