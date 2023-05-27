const amqp = require("amqplib/callback_api");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

function rabbitmqConnect() {
  amqp.connect("amqp://rabbitmq:5672", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "task_queue";

      channel.assertQueue(queue, {
        durable: false,
      });

      eventEmitter.on("message_received", (data) => {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        console.log("dfwefffffffewfwef");
      });
    });
    //   setTimeout(function() {
    //     connection.close();
    //     process.exit(0)
    //   }, 500);
  });
}
module.exports = { rabbitmqConnect, eventEmitter };
