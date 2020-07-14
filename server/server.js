const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;

//Requiring routes
const signupRoute = require("./routes/auth");
const restroauthRoute = require("./routes/restroauth");
const tableRoute = require("./routes/table");
const restroRoute = require("./routes/restro");
const menuRoute = require("./routes/menu");
const permissionRoute = require("./routes/permissions");

mongoose.connect(db, {useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})

app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());
app.use("/",signupRoute);
app.use("/restro",restroauthRoute);
app.use("/restro",restroRoute);
app.use("/",tableRoute);
app.use("/menu",menuRoute);
app.use("/permission",permissionRoute);

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

//Initializing the server instance
var io =require("socket.io")(server);

io.on("connection",(socket) => {
    console.log('A user just connected');

    //Different room for each table
    socket.on('joinRoom',(name,tableId) => {
        //User joins the table
        socket.join(tableId);
        //Sending the menu updates to everybody in the particular room
        socket.once("countChange",(menu) => {
            console.log("ok ");
            io.to(tableId).emit("menuChange",menu);
        })

        // socket.on('disconnect', function(){
        //     socket.disconnect(true);
        //     console.info('disconnected user (id=' + socket.id + ').');
        // });

        console.log(name,tableId);

    })
})
