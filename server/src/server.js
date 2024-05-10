const express = require('express');
const endpoints = require("./api/routes");
const cors = require('cors');
const server = express();
const port = 3000;

const corsOptions = {
    origin: 'http://ec2-52-48-221-236.eu-west-1.compute.amazonaws.com',
    optionsSuccessStatus: 200
}

server.use(cors(corsOptions))
server.use(express.json());
server.use("/api", endpoints);

server.listen(port, () => {console.log(`Server has started on port: ${port}`)});