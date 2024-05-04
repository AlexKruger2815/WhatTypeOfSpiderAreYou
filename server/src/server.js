const express = require('express');
const endpoints = require("./api/routes");
const server = express();
const port = 3000;


server.use(express.json());
server.use("/api", endpoints);

server.listen(port, () => {console.log(`Server has started on port: ${port}`)});