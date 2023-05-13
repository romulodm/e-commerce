require('dotenv').config({path:'vars.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoute = require("./routes/auth");

const server = express();
server.use(cors());
server.use(express.json());
server.use("/rep-api/auth", authRoute);


server.listen(process.env.PORT, () => {
    console.log(`Server running at: http://localhost:${process.env.PORT}`);
});
