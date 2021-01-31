var express = require('express');
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/* GET home page. */
router.get("/",(req,res)=>{
  // res.json({message:"anasayfaya hoşgeldiniz"})
  res.render("index",{
    title:"anasayfa"
  })
})

router.get('/register', function(req, res, next) {
  res.json({message:"register sayfası"})
});

//register post 
router.post("/register",(req,res)=>{
  const {userName,password} = req.body;
  bcrypt.hash(password, 10).then((hash)=> {  //bcryp ile şifreyi hash ettik.npm js te proimse kullanımını tercih ettik
    const user= new User({
      userName,
      password: hash
    });
    user.save()
      .then(data=>res.json(data))
      .catch(err=>res.json(err))
  })
});

// jwt ile oturum yönetimi
router.post("/authenticate",(req,res)=>{
  const {userName,password} = req.body
  User.findOne({userName},(err,user)=>{
    if(err)
      throw err
    else if(!user){
        res.json({
          status: false,
          message:"kullanıcı bulunamadı"
        });
    }
    else{
      bcrypt.compare(password,user.password).then((result)=>{ // kullanıcı girişindeki password db deki passwordle eşleşirse result true döner
        if(!result){
          res.json({
            status: false,
            message:"şifre bilgisi yanlış"
          })
        }else{ //önce config içinde secret key oluşturuldu 
          const payload={ //jwt içinde taşınacak(1.parametre) payload oluşturuldu(password gibi özel bilgiler dahil edilmemeli)
            userName
          };
          const token = jwt.sign(payload,req.app.get("api_secret_key"),{expiresIn:720}); // 12 saat geçerli token oluşturuldu.(1.parametre payload,2. parametre app.js de set ettiğimiz (configden alınan) api_secret_key'i req.app.get ile aldık)
          res.json({
            status: true,
            token
          })
        }
        
      })
    }
  })
})




module.exports = router;
