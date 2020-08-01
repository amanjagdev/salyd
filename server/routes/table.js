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
router.post("/orderplace",(req,res) => {

    const {tableId,menu} = req.body;

    Table.findByIdAndUpdate(tableId,{
        menu
    },{
        new : true,
        runValidators : true
    }).then((table) => {
        res.status(200).json(table);
    }).catch((err) => {
        res.status(422).json(err);
    })

})

//Fetching the order placed menu for bill generation
router.post("/generatebill",(req,res) => {
    const {tableId} = req.body;
    Table.findById(tableId)
    .then((table) => {
        res.status(200).json(table.menu);
    }).catch((err) => {
        console.log(err);
    })
})

// router.post("/orderplace",(req,res) => {
//     const {tableId,menu} = req.body;
//     var changedMenu;
//     var newChangedMenu;
//     Table.findById(tableId)
//     .then((table) => {
//         var dbmenu = table.menu;
//         for(let i=0;i<dbmenu.length;i++) {
//             for(let j=0;j<menu.length;j++) {
//                 if(dbmenu[i].item === menu[j].item) {
//                     changedMenu = {
//                         item : menu[i].item,
//                         price : menu[i].price,
//                         count : dbmenu[i].count+menu[j].count
//                     }
//                     //Deleting the previous object and replacing with changed Menu

//                     const index = dbmenu.indexOf(dbmenu[i].item);
//                     if(index > -1) {
//                         dbmenu.splice(index,1);
//                     }
//                     console.log(changedMenu);
//                     dbmenu.push(changedMenu);
//                     break;
//                 }
//                 else {
//                     newChangedMenu = menu[i];
//                     dbmenu.push(newChangedMenu);
//                     console.log(newChangedMenu);
//                     break;
//                 }
//             }
//         }
//         console.log(dbmenu,"new array");
        
//         // Table.findByIdAndUpdate(tableId,{
//         //     menu
//         // },{
//         //     new : true,
//         //     runValidators : true
//         // }).then((table) => {
//         //     res.status(200).json(table);
//         // }).catch((err) => {
//         //     res.status(422).json(err);
//         // })
//     }).catch((err) => {
//         console.log(err);
//     })
// })

// router.post("/orderplace",(req,res) => {
//     const {tableId,menu} = req.body;
//     Table.findById(tableId)
//     .then((table) => {
//         menu.map((menuitem) => {
//             const found = table.menu.some((elem) => {
//                 elem.item === menuitem.item
//             })
//             if(!found) {
//                 table.menu.push(menuitem)
//             }
//         })
//         console.log(table.menu);
        
//     })
// })
module.exports = router;
