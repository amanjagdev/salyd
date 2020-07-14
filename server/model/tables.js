const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema.Types;

const tableSchema = new Schema({
    _id: {
        type : String
    },
    users : [{
        type : ObjectId,
        ref : "userModel"
    }],
    tableOf : {
        type : String,
        ref : "restroModel"
    },
    roomId : {
        type : Number
    },
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
        }
    ]
    
})


const tableModel = mongoose.model("tableModel",tableSchema);
module.exports = tableModel;