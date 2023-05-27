const express = require("express");
const server = express();
const v1route = require("./routes/index");
const { rabbitmqConnect } = require("./config/rabbitmq-config");
const { redisConnect } = require("./config/redis-config");
const { PORT } = require("./config/server-config");

server.use(express.json());
server.use("/api", v1route);

const startAndcreateServer = async () => {
  server.listen(PORT || 3300, () => {
    console.log(`Server started at port ${PORT || 3300}`);
  });
  rabbitmqConnect();
  redisConnect();
};
startAndcreateServer();
