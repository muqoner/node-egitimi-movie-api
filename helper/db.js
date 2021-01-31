const mongoose = require("mongoose");


module.exports = ()=>{
    mongoose.connect("mongodb+srv://muqoner:UrFiEyeuXspUuP5n@mugoner.f6t1t.mongodb.net/node-egitimi-movie-api?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }); // jwt alabilmek için ((useUnifiedTopology: true, useCreateIndex: true))  mutlaka eklemelisin!!!
    mongoose.connection.on("open",()=>{
        // console.log("mongoDb: Connected")
    })
    mongoose.connection.on("error",(err)=>{
        console.log("mongoDb: Error", err)
    })
    mongoose.Promise = global.Promise;
}