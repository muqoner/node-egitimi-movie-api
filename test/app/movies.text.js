const chai = require("chai");
const chaiHttp = require("chai-http"); // http call işlemleri için kullanıyoruz
const should = chai.should();  // meli -malı sorgusu için dahil ettik
const server = require("../../app"); //app.js içinde server kurulu olduğu için dahil ettik


chai.use(chaiHttp);
let token;

describe("/api/movies tests",()=>{
    before((done)=>{
        
        console.log("çalışıyor before")
        // done();
        chai.request(server)
            .post("/authenticate")
            .send({userName:"ozgur",password:"1234567"})
            .end((err,res)=>{
                token= res.body.token;
                console.log(token);
                done();
            })
    })
    describe("/Get movies",()=>{
        it("tüm moviesler listelenmeli",(done)=>{
            // console.log("sonra ben çalıştım")
            // done();
            chai.request(server)
                .get("/api/movies")
                .set("x-access-token",token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                })
        })
    })
})

