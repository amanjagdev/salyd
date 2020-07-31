const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const cors = require('cors');
const webpush = require("web-push");

//Requiring routes
const signupRoute = require("./routes/auth");
const restroauthRoute = require("./routes/restroauth");
const tableRoute = require("./routes/table");
const restroRoute = require("./routes/restro");
const menuRoute = require("./routes/menu");
const permissionRoute = require("./routes/permissions");
const subscribeRoute = require("./routes/subscribe");

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Database connected'))
    .catch((err) => {
        console.log(err);
    })

app.use(express.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors());

app.use("/", signupRoute);
app.use("/restro", restroauthRoute);
app.use("/restro", restroRoute);
app.use("/", tableRoute);
app.use("/menu", menuRoute);
app.use("/permission", permissionRoute);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

//Initializing the server instance
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log('A user just connected');

    //Different room for each table
    socket.on('joinRoom', (name, tableId) => {
        console.log("Table Id on joining room:  ",tableId);
        socket.join(tableId);
    })

    //Listening for count change event and then sending menu updates to all the clients
    socket.on("countChange", (menu,tableId) => {
        console.log("Menu changed ");
        console.log("Table Id :  ",tableId);
        io.to(tableId).emit("menuChange", menu);
    })

    //Emitting the event to the restro side on placing the order
    socket.on("orderPlaced", (tableId) => {
        console.log("order placed event from server");
        io.emit("confirmOrder",tableId);
    })

    //Listening for the approve Order event from restro side
    socket.on("approveOrder",(tableId) => {
        console.log("approve order server side",tableId);
        io.emit("paid",tableId);
    })
})

// //Web push notifications -->
// const publicVapidKey = "BAfI4ESJesvpP45uii_K1OK4p33kspY-kNydrM1nPTdUvUpLbsTFY6UspWyDFQJIt-QHfMEtrOdFiMViT7E8EGc";

// const privateVapidKey = "FJotabmZnmmZhCaaMxw_yjY5ztsHm3jDnZX7SRGf2KY";

// webpush.setVapidDetails("mailto:salyd@support.com",publicVapidKey,privateVapidKey);

// //Subscribe route
// app.use("/subscribe",subscribeRoute);

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

