const { createClient } = require("redis");
const client = createClient({ url: "redis://redis-server:6379" });

async function redisConnect() {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("Redis connected successfully");
}

module.exports = { redisConnect, client };
