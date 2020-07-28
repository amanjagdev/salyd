const express = require("express");
const router = express.Router();
const webpush = require("web-push");

router.post("/",(req,res) => {
    //Get push subscription object
    const subscription = req.body;
    console.log(subscription,"subscription");
    res.status(201).json({});

    //Create payload
    const payload = JSON.stringify({
        title  : "Push Test"
    })
    
    //Pass object into sendNotification
    webpush.sendNotification(subscription,payload)
    .then((result) =>  console.log(result))
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;