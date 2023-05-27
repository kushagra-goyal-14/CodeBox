const rabbitmqConnect = require("./config/rabbitmq-config");
const { redisConnect } = require("./config/redis-config");
const startWorker = async () => {
  rabbitmqConnect();
  redisConnect();
};
console.log(process.cwd());
startWorker();
