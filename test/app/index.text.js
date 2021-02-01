const chai = require("chai");
const chaiHttp = require("chai-http"); // http call işlemleri için kullanıyoruz
const should = chai.should();  // meli -malı sorgusu için dahil ettik
const server = require("../../app"); //app.js içinde server kurulu olduğu için dahil ettik


chai.use(chaiHttp);

describe("Node Server",()=>{ //node server diyerek ne tür bir sorgu olduğunu açıklıyoruz 
    it("(GET /) Anasayfayı döndürmelidir",(done)=>{ // yaptığımız açıklama başarılıysa yani done(tamamlandı) edilirse test başarılı
        chai.request(server) // serverdaki rout lar arasında anasayfaya get atıp 200 kodu alırsa done(tamamlanmış) olur
            .get("/")
            .end((err,res)=>{
                res.should.have.status(200);
                done();
            })
    } )
}) 