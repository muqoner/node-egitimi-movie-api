const jwt = require("jsonwebtoken");
module.exports =  (req,res,next)=>{
    const token = req.headers["x-access-token"] || req.body.token || req.query.token; // header içinde gelebilir veya post işlemiyle gelebilir veya localhost:3000/api/movies?token=123123130190 şeklinde sorguyla gelebilir
    if(token){
        jwt.verify(token,req.app.get("api_secret_key"),(err,decoded)=>{ // req  üzerinden gelen token ile oluşturulmuş token karşılaştırılıyor 
            if(err){
                res.json({
                    status: false,
                    message:"token yanlış veya bu tokenin süresi doldu!!"
                })
            }else{
                req.decoded=decoded;
                next();
            }
        });
        
    }else{
        res.json({
            status: false,
            message:"token oluşturunuz!"
        })
    }
}