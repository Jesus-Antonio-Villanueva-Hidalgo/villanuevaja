let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3002';

describe("Obtiene ciudades: ", () => {
  it("Deberia obtener todas las ciudades", (done) => {
    chai
      .request(url)
      .get("/city/")
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});
