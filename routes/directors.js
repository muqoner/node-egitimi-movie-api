const express = require("express");
const router = express.Router();
const Director = require("../models/Director");
const mongoose = require("mongoose");
//anasayfa get
router.get("/",(req,res)=>{
    Director.aggregate([
        {
            $lookup:{
                from:"movies", // nereyle join(birşelme) yapılacaksa db üzerindeki collectionu seçtik
                localField:"_id", // directorun eşleşecek alanı
                foreignField:"director_id", // movies ile eşlecek alan
                as: "movies" // hangi isim altında sıralanacak filmler
            }
        },
        {
            $unwind:{
                path:"$movies", // yukarıdaki as ile gelen movies i kullanabilmek için unwind in pathine taşıdık
                preserveNullAndEmptyArrays: true // filmi olmasa da directoru geri döndürmesi şçin yazıldı
            }
        },
        {
            $group:{     //ortak alanları belirlemek için grupladık.aksi durumda aynı director için ayrı ayrı listelenecekti movieler
                _id:{                          
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies: {
                    $push:"$movies"
                }
            }
        },
        {
            $project: {      // listeleme daha temiz görünsün diye projectle yapılandırdık
                _id:"$_id._id",
                name:"$_id.name",
                surname:"$_id.surname",
                movies:"$movies"
            }
        }
    ])
        .then(data=>{res.json(data)})
        .catch(err=>res.json(err))
})

//director id bazlı sorgu
router.get("/:director_id",(req,res)=>{
    Director.aggregate([
        {
            $match:{ // req.params dan gelen id ile db deki id ile eşleşen director ve filmler
                "_id": mongoose.Types.ObjectId(req.params.director_id) 
            } 
        },
        {
            $lookup:{
                from:"movies", // nereyle join(birşelme) yapılacaksa db üzerindeki collectionu seçtik
                localField:"_id", // directorun eşleşecek alanı
                foreignField:"director_id", // movies ile eşlecek alan
                as: "movies" // hangi isim altında sıralanacak filmler
            }
        },
        {
            $unwind:{
                path:"$movies", // yukarıdaki as ile gelen movies i kullanabilmek için unwind in pathine taşıdık
                preserveNullAndEmptyArrays: true // filmi olmasa da directoru geri döndürmesi şçin yazıldı
            }
        },
        {
            $group:{     //ortak alanları belirlemek için grupladık.aksi durumda aynı director için ayrı ayrı listelenecekti movieler
                _id:{                          
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies: {
                    $push:"$movies"
                }
            }
        },
        {
            $project: {      // listeleme daha temiz görünsün diye projectle yapılandırdık
                _id:"$_id._id",
                name:"$_id.name",
                surname:"$_id.surname",
                movies:"$movies"
            }
        }
    ])
        .then(data=>{res.json(data)})
        .catch(err=>res.json(err))
})

// director ekleme
router.post("/",(req,res)=>{
   const director= new Director(req.body)
   director.save()
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})
module.exports = router;