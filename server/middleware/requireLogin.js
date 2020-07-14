const jwt = require("jsonwebtoken");
const secret = require("../config/keys").JWT_SECRET;
const mongoose = require("mongoose");
const User = require("../model/user");

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({
            error : "no headers provided"
        })
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token,secret,(err,payload) => {
        if(err) {
            res.status(422).json({
                error : "You must be logged in"
            })
        }
        else {
            //Payload which was given as id while signing in
            const {_id} = payload;
            User.findById({
                _id
            }).then((userData) => {
                req.user = userData
                next();
            })
        }
    })
}