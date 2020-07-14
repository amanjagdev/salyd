const jwt = require("jsonwebtoken");
const secret = require("../config/keys").JWT_SECRET;
const mongoose = require("mongoose");
const Restro= require("../model/restro");

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
            Restro.findOne({
                _id
            }).then((restroData) => {
                req.restro = restroData
                next();
            })
        }
    })
}