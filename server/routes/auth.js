const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/keys").JWT_SECRET;

const requireLogin = require("../middleware/requireLogin");
const sendSms = require("../twilio");

router.get('/home',requireLogin,(req,res) => {
    res.json("hello fam");
})

router.post('/signup',(req,res) => {
    const {name,email,phone,password} = req.body;
    if(!name || !email || !phone || !password){
        return res.status(422).json({
            error : "Please fill all the fields"
        })
    }
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email))
    {
        return res.status(422).json({
            error : "Please enter valid email address"
        })
    }
    
    //Checking if the user is already signed up or not
    User.findOne({
        email
    }).then((user) => {
        if (user) {
            return res.status(422).json({
                error : "User with that email already exists"
            })
        }

    //If not saving the new User 
    bcrypt.hash(password,10).then((hashedPass) => {
        const newUser = new User({
            name,
            email,
            phone,
            password : hashedPass
        })
    
        newUser.save()
        .then((saveduser) => {
            res.status(200).json(saveduser);
        }).catch((err) => {
            console.log(err);
        }).catch((err) => {
            console.log(err);
        })
    })
    })
})


router.post('/signin',(req,res) => {
    const {email,password} = req.body;
    
    if(!email || !password) {
        return res.status(422).json({
            error : "Please fill all the fields"
        })
    }

    //Checking if the user has registered or not
    User.findOne({
        email
    }).then((user) => {

        if(!user) {
            return res.status(422).json({
                error : "User with this email is not registered"
            })
        }

        bcrypt.compare(password,user.password)
        .then((isMatch) => {
            if(isMatch) { 
                //If password matches then issue a token depending upon the payload given
                const token = jwt.sign({
                    _id : user._id
                },secret)
                
                const {_id,email,password,name} = user;
                res.json({
                    token ,
                    user : {_id,email,password,name}
                })
                // res.json({
                //     message : "signed in successfully"
                // })
            }
            else {
                res.json({
                    error : "Sorry Incorrect Email/Password"
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    })
})

// router.post('/forgotpass',(req,res) => {
//     const {phone} = req.body;
//     const otp = Math.floor(Math.random() * 100000);
//     const welcomeMessage = 'Your verficiation code is '+otp;
//     console.log(otp);
//     sendSms(phone, welcomeMessage);
//     res.json({
//         message : "send successfully"
//     })
// })

module.exports = router;