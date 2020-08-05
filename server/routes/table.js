const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Restro = require("../model/restro");
const Table = require("../model/tables");
const User = require("../model/user");

//Saving tabledetails to the db
router.post('/tabledetails',(req,res) => {
    Table.create(req.body)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
    })
})

//New table created by user by entering the tableId
router.post('/newtable',requireLogin,(req,res) => {
    console.log(req.user._id);
    const roomId =  Math.floor((Math.random() * 10000));

    //Changing the role of user entering tableId to 'admin'
    User.findByIdAndUpdate(req.user._id, {
        $set : {role : "admin"} 
    }, {
        new : true,
        runValidators : true
    }).exec((err,result) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    })

    //Adding the user(admin) to the users array of that table
    Table.findByIdAndUpdate(req.body.tableId, {
        $push : {users : req.user._id}
    },
    {
        new : true
    },(err,result) => {
        if(err) {
            res.status(422).json({
                error : err
            });
        }
        //Dynamically generating roomId and saving it to db
        Table.findByIdAndUpdate(req.body.tableId , {
            $set : {roomId }
        }, {
            new : true
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(422).json({
                error : err
            });
        })
    })
})

//Adding new member to the table
router.post("/addmember",requireLogin,(req,res) => {
    const {roomId} = req.body;
    
    Table.findOneAndUpdate({roomId : roomId}, {
        $push : {users : req.user._id}
    }, {
        new : true
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(422).json({
            error : err
        });
    })
})


//Registering and adding member to the table if he/she is not registered

router.post("/registerandaddmember",(req,res) => {
    const {roomId,name} = req.body;

    const newUser = new User({
        name
    })

    newUser.save()
    .then((savedUser) => {
        console.log(savedUser);

        User.findOne({
            name
        }).then((user) => {
            let id = user._id;
    
            console.log(id);
            Table.findOneAndUpdate({roomId : roomId}, {
                $push : {users : id }
            }, {
                new  : true
            }).then((result) => {
                res.status(200).json({
                    result,
                    id 
                });
            }).catch((err) => {
                res.status(422).json(err);
            })   
        })
    }).catch((err) => {
        console.log(err);
    })    
})

//Menu to be posted by admin
router.post("/orderplace",requireLogin,(req,res) => {

    const {menu,tableId,orderId,name,address,date} = req.body;
    //TODO : Add the ordered menu to the users and restro collection
    User.findByIdAndUpdate(req.user._id,{
        $push : {recentOrders : {
            menu,
            tableId,
            orderId,
            restroDetails : {
                name,
                address
            },
            date
        }}
    },{
        new : true,
        runValidators : true
    }).then((user) => {
        res.status(200).json(user.recentOrders);
    }).catch((err) => {
        res.status(422).json(err);
    })
})


//Getting the restaurant details 
router.post("/getrestro",(req,res) => {
    const {tableId} = req.body;
    Table.findById(tableId)
    .populate("tableOf",["id","name","address"])
    .then((restro) => {
        res.status(200).json(restro);
    }).catch((err) => {
        res.status(401).json(err);
    })
})

module.exports = router;
