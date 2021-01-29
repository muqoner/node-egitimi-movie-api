var express = require('express');
const { count } = require('../models/Movie');
var router = express.Router();
const Movie = require("../models/Movie");


router.get("/",(req,res)=>{
  Movie.aggregate([
    {
      $lookup:{
                  from:"directors",
                  localField:"director_id",
                  foreignField:"_id",
                  as:"director"
              }
    },
    {
      $unwind:"$director"
    }
  ])
    .then(data=>res.json(data))
    .catch(err=>res.json(err));
})
// db ye film ekleme
router.post('/', function(req, res, next) {
  // const { title,imdb_score,category,country,year} = req.body;
  // const movie = new Movie({
  //   title: title,
  //   imdb_score: imdb_score,
  //   category: category,
  //   country: country,
  //   year: year
  // })
  // movie.save((err,data)=>{
  //   if(err)
  //     res.json(err)

  //   res.json(data)
  // })
  const movie = new Movie(req.body);
  movie.save()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))


});

//top10 sıralaması
router.get("/top10",(req,res)=>{
  Movie.find({}).limit(10).sort({imdb_score: -1})
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

//id bazlı movi sorgusu
router.get("/:movie_id",(req,res,next)=>{
  Movie.findById(req.params.movie_id)  // req.params içine url de belirtilen değişken id otomatik yerleşir
    .then(movie=>{
      if(!movie)
        next({message:"the movie was not found", code:99})
      res.json(movie)
    })
    .catch(err=>res.json(err))
})
//put işlemi
router.put("/:movie_id",(req,res)=>{
  Movie.findByIdAndUpdate(req.params.movie_id,(req.body),{new:true}) // new: true demezsek dönen data eski hali..
    .then(data=>{
      if(!data)
        res.json({message:"bu id ile bir film bulunamadı"})
      res.json(data)
    })
    .catch(err=>console.log(err))
})

//delete işlemi
router.delete("/:movie_id",(req,res)=>{
  Movie.findByIdAndRemove(req.params.movie_id)
    .then(()=>{
      res.json({result: "film başarıyla silindi"})
    })
    .catch(err=>res.json(err))
})

// between 
router.get("/between/:start_year/:end_year",(req,res)=>{
  Movie.find({year:{"$gte":parseInt(req.params.start_year), "$lte":parseInt(req.params.end_year)}})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})
module.exports = router;
