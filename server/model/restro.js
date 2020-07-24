const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restroSchema = new Schema({
    _id : {
        type : String
    },
    fullname : {
        type : String
    },
    name : {
        type :String
    },
    address : {
        type : String
    },
    phone : {
        type : Number
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    menu : [
        {
            item : {
                type : String
            },
            price : {
                type : Number
            }
        }
    ]
})

const restroModel = mongoose.model("restroModel",restroSchema)
module.exports = restroModel;