const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Director = new Schema({
    name: String,
    surname:String,
    bio: String,
    craetaAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("director",Director);