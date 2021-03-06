const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Director = new Schema({
    name: {
        type: String,
        maxlength:20,
        minlength:2
    },
    surname: {
        type: String,
        maxlength:60,
        minlength:2
    },
    bio:  {
        type: String,
        maxlength:1000,
        minlength:2
    },
    craetaAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("director",Director);