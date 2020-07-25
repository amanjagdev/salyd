const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Table = require("../model/tables");
const Restro = require("../model/restro")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/keys").JWT_SECRET;

router.get("/getrestro",(req,res) => {
    Restro.find({})
    .then((restro) => {
        res.json(restro);
    }).catch((err) => {
        res.json(err);
    })
})  

//SignUp Route
router.post("/signup",(req,res) => {
    const {_id,fullname,name,address,phone,email,password} = req.body;

    // if(!_id || !name || !city || !address || !password) {
    //     res.json({
    //         error : "Please enter all the fields"
    //     })
    // }
    console.log("ID : ",_id);

    Restro.findOne({
        _id
    }).then((restro) => {
        if(restro) {
            return res.json({
                error : "Restro already registered"
            })
        }

        bcrypt.hash(password,10).then((hashedPass) => {
            newRestro = new Restro({
                _id,
                fullname,
                name,
                address,
                phone,
                email,
                password : hashedPass
            })

            newRestro.save()
            .then((savedRestro) => {
                res.json(savedRestro);
            }).catch((err) => {
                console.log(err);
            })
        })
    })
})

//SignIn Route
router.post('/signin',(req,res) => {
    const {_id,password} = req.body;
    
    if(!_id || !password) {
        return res.status(422).json({
            error : "Please fill all the fields"
        })
    }

    //Checking if the restro has registered or not
    Restro.findOne({
        _id
    }).then((restro) => {

        if(!restro) {
            return res.status(422).json({
                error : "Your restaurant is not registered with us"
            })
        }

        bcrypt.compare(password,restro.password)
        .then((isMatch) => {
            if(isMatch) { 
                // If password matches then issue a token depending upon the payload given
                const token = jwt.sign({
                    _id : restro._id
                },secret)
                
                res.json({
                    token ,
                    restro
                })
                // res.json({
                //     message : "signed in successfully"
                // })
            }
            else {
                res.json({
                    error : "Sorry Incorrect Username/Password"
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    })
})

module.exports = router;
