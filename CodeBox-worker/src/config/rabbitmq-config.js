var amqp = require("amqplib/callback_api");
const createFiles = require("../file-system/createFile");

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
      channel.prefetch(1);
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      channel.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
          let json_msg = JSON.parse(msg.content.toString());
          console.log("[x] Received %s", json_msg.filename);
          createFiles(json_msg, channel, msg);
        },
        {
          // manual acknowledgment mode,
          // see ../confirms.html for details
          noAck: false,
        }
      );
    });
  });
}
module.exports = rabbitmqConnect;
