const mongoose = require("mongoose");


module.exports = ()=>{
    mongoose.connect("mongodb+srv://muqoner:UrFiEyeuXspUuP5n@mugoner.f6t1t.mongodb.net/node-egitimi-movie-api?retryWrites=true&w=majority",{ useNewUrlParser: true });
    mongoose.connection.on("open",()=>{
        console.log("mongoDb: Connected")
    })
    mongoose.connection.on("error",(err)=>{
        console.log("mongoDb: Error", err)
    })
    mongoose.Promise = global.Promise;
}