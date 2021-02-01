const chai = require("chai");
const chaiHttp = require("chai-http"); // http call işlemleri için kullanıyoruz
const should = chai.should();  // meli -malı sorgusu için dahil ettik
const server = require("../../app"); //app.js içinde server kurulu olduğu için dahil ettik
const mongoose = require("mongoose");

chai.use(chaiHttp);
let token,movie_id;

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
    });
    describe("POST movie",()=>{
        it("api/moveis e film kaydetmeli",(done)=>{
            const movie={
                title:"kapıcılar kralı",
                director_id:"6014703152786535e80be454",
                category:"komedi",
                country:"turkey",
                year:1980,
                imdb_score:9
            };
            chai.request(server)
                .post("/api/movies")
                .send(movie)
                .set("x-access-token",token)
                .end((err,res)=>{
                    res.should.have.status(200); //başarılı olmalı
                    res.body.should.be.a("object"); //geriye bir obje döndürmeli
                    res.body.should.have.property("title"); // dönen ojenin propertyleri arasında title olmalı ....
                    res.body.should.have.property("director_id");
                    res.body.should.have.property("category");
                    res.body.should.have.property("country");
                    res.body.should.have.property("year");
                    res.body.should.have.property("imdb_score");
                    movie_id=(res.body._id);
                    done();
                })
        })
    });
    describe("GET by id sorgusu",()=>{
        it("/api/movies/movie_id",(done)=>{
            console.log("id bazlı sorgu yapılıyor")
            chai.request(server)
                .get("/api/movies/" + movie_id)
                .set("x-access-token",token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a("object"); //geriye bir obje döndürmeli
                    res.body.should.have.property("title"); // dönen ojenin propertyleri arasında title olmalı ....
                    res.body.should.have.property("director_id");
                    res.body.should.have.property("category");
                    res.body.should.have.property("country");
                    res.body.should.have.property("year");
                    res.body.should.have.property("imdb_score");
                    res.body.should.have.property("_id").eql(movie_id);
                    done();
                })
        })
    });
    describe("movie id ile Put işlemi",()=>{
        it("put işlemi ile filmin güncellenmesi gerekir",(done)=>{
            const movie={
                title:"kapıcılar kralı2",
                director_id:"6014703152786535e80be455",
                category:"dram",
                country:"turkey",
                year:1984,
                imdb_score:9
            };
            chai.request(server)
                
                .put("/api/movies/" + movie_id)
                .send(movie)
                .set("x-access-token",token)
                .end((err,res)=>{
                    res.should.have.status(200); //başarılı olmalı
                    res.body.should.be.a("object"); //geriye bir obje döndürmeli
                    res.body.should.have.property("title").eql(movie.title); // dönen ojenin title ile yollanan movie objesinin title ı aynı mı??? ....
                    res.body.should.have.property("director_id").eql(movie.director_id);
                    res.body.should.have.property("category").eql(movie.category);
                    res.body.should.have.property("country").eql(movie.country);
                    res.body.should.have.property("year").eql(movie.year);
                    res.body.should.have.property("imdb_score").eql(movie.imdb_score);
                    done();
                })
        })
    });
    describe("Delete işlemi",()=>{
        it("movie_id ile film silme",(done)=>{
            chai.request(server)
                .delete("/api/movies/" + movie_id)
                .set("x-access-token","asdadadasdd")
                .end((err,res)=>{
                    res.should.have.status(200),
                    res.should.be.a("object");
                    res.body.should.have.property("result").eql("film başarıyla silindi") // movie.js router ında oluşturduğum delete işleminde döndürdüğüm object ın içindeki degerlerle kıyaslıyorum
                    done();
                })
        })
    })

});

