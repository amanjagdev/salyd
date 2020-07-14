const express = require("express");
const router = express.Router();
const Restro = require("../model/restro"); 
const Table= require("../model/tables");
const restroRequireLogin = require("../middleware/restroRequireLogin");
const requireLogin = require("../middleware/requireLogin");


//Fetching menu for logged in user
router.get('/',requireLogin,(req,res) => {  
    Table.findOne({
        users : {$elemMatch : {$eq : req.user._id }}
    }).populate("tableOf",["id","menu","name"])
    .then((menu) => {
        res.json(menu);
    }).catch((err) => {
        console.log(err);
    })
})

//Fetching menu for guest user
router.post('/guest',(req,res) => {
    
    const {roomId} = req.body;

    Table.findOne({
        roomId    
    }).populate("tableOf",["id","menu","name"])
    .then((menu) => {
        res.json(menu);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;