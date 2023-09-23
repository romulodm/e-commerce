require('dotenv').config({path:'vars.env'});
const express = require('express');
const cors = require('cors');
const db = require('./db');

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const emailRoute = require("./routes/emailRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const imageRoute = require("./routes/imageRoute");
const sizeRoute = require("./routes/sizeRoute");
const supplierRoute = require("./routes/supplierRoute");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/rep-api/user", userRoute);
server.use("/rep-api/auth", authRoute);
server.use("/rep-api/email", emailRoute);
server.use("/rep-api/product", productRoute);
server.use("/rep-api/category", categoryRoute);
server.use("/rep-api/image", imageRoute);
server.use("/rep-api/size", sizeRoute);
server.use("/rep-api/supplier", supplierRoute);
//{ force: true }
db.sync().then(() => {
    server.listen(process.env.PORT)
    console.log(`Server running at: http://localhost:${process.env.PORT}`);
}).catch(err => console.log(err))