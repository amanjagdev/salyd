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
    placedOrders : [{
        menu : [  
            {
                item : {
                    type : String
                },
                price : {
                    type : Number
                },
                count : {
                    type : Number
                }
            },
        ],
        username : {
            type : String
        },
        orderId : {
            type : String
        },
        tableId : {
            type : String
        },
        date : {
            type : Date
        }
    }]
})

const restroModel = mongoose.model("restroModel",restroSchema)
module.exports = restroModel;