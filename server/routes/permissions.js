const express = require('express');
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Restro = require("../model/restro");
const Table = require("../model/tables");
const User = require("../model/user");
const {authorize} = require("../middleware/authorize");

//Definning the permissions by the admin to the members
router.post('/grant',requireLogin,(req,res) => {
    const {permission} = req.body;
    Table.findOne({
        users : {$in : [req.user._id] }
    }).then((data) => {
        
        const newusers=data.users.filter((users) => users.toString() !== req.user._id.toString());

        newusers.map((id) => {
            User.findByIdAndUpdate(id, {
                $set : {role : permission}
            }, {
                new : true,
                runValidators : true
            }).then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err);
            })
        });
    }).catch((err) => {
        res.json(err);
    })

})

//Fetching permission role for logged in user
router.get("/get",requireLogin,(req,res) => {

    const id = req.user._id;

    User.findById(id)
    .then((user) => {
        res.status(200).json({
            user
        })
    }).catch((err) => {
        res.status(422).json({
            err
        })
    })
})

//Fetching permission role for guest user
router.post("/get",(req,res) => {
    
    const {id} = req.body;

    User.findById(id)
    .then((user) => {
        res.status(200).json({
            user
        })
    }).catch((err) => {
        res.status(422).json({
            err
        })
    })
})

module.exports= router;