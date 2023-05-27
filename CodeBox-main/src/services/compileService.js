const random = require("../utils/random");
const { eventEmitter } = require("../config/rabbitmq-config");
const { client } = require("../config/redis-config");
class compileService {
  constructor() {}
  async runCode(req) {
    try {
      const data = {
        src: req.body.src,
        stdin: req.body.stdin,
        lang: req.body.lang,
        filename: "Test" + random(10),
      };
      console.log(req.body.src);
      if (req.body.src && req.body.lang) {
        if (data) {
          eventEmitter.emit("message_received", data);
          console.log(data);
        }
        return (
          req.protocol +
          "://" +
          req.get("host") +
          "/api/v1/results/" +
          data.filename
        );
      } else {
        console.log("Invalid Request has been made");
        let result = {
          output: "Invalid Request",
          status: "Invalid Request",
        };
        await client.set(data.filename.toString(), JSON.stringify(result), {
          EX: 300,
        });
        return (
          req.protocol +
          "://" +
          req.get("host") +
          "/api/v1/results/" +
          data.filename
        );
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getStatus(filename) {
    try {
      const res = await client.get(filename);
      if (res == null) {
        return { status: "Queued" };
      } else if (res == '{"status":"Processing"}') {
        return { status: "Processing" };
      } else if (res == '{"status":"Runtime Error"}') {
        return { status: "Runtime Error" };
      } else {
        return res;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = compileService;
