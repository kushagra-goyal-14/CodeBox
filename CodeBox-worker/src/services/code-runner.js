const deletingTempFiles = require("../file-system/deleteFile");
const { client } = require("../config/redis-config");
const { commandMap } = require("./commands");
const { spawn } = require("child_process");

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
  go: "go",
};

async function runCode(json_msg, channel, msg) {
  try {
    await client.set(json_msg.filename.toString(), '{"status":"Processing"}', {
      EX: 300,
    });
    const timeout = 20;
    const { comCommand, comArgs, exCommand, exArgs } = commandMap(
      json_msg.filename,
      extensions[json_msg.lang]
    );
    if (comCommand) {
      await new Promise((resolve, reject) => {
        const compiledCode = spawn(comCommand, comArgs || []);
        compiledCode.stderr.on("data", (error) => {
          reject({ status: "Failed", error: error.toString() });
        });
        compiledCode.on("exit", () => {
          resolve();
        });
      });
    }
    const result = await new Promise((resolve, reject) => {
      const exCode = spawn(exCommand, exArgs || []);
      let output = "",
        error = "";

      const timer = setTimeout(async () => {
        exCode.kill("SIGHUP");

        console.log("timeout");

        reject({
          status: "Runtime Error",
          error: `Timed Out. Your code took too long to execute, over ${timeout} seconds. Make sure you are sending input as payload if your code expects an input.`,
        });
        console.log("rejected");
      }, timeout * 1000);
      console.log(json_msg.stdin.toString());
      json_msg.stdin
        .toString()
        .split("\n")
        .forEach((line) => {
          exCode.stdin.write(`${line}\n`);
        });
      exCode.stdin.end();

      exCode.stdin.on("error", (err) => {
        console.log("stdin err", err);
      });

      exCode.stdout.on("data", (data) => {
        output += data.toString();
      });

      exCode.stderr.on("data", (data) => {
        error += data.toString();
      });

      exCode.on("exit", (err) => {
        console.log("exit");
        clearTimeout(timer);
        resolve({ output, error });
      });
    });

    if (result.error === "") {
      let ans = {
        output: result.output,
        status: "Success",
        stderr: result.error,
        submission_id: json_msg.filename,
      };
      console.log(ans);
      await client.set(json_msg.filename.toString(), JSON.stringify(ans), {
        EX: 300,
      });
    } else {
      throw { status: "Failed", error: result.error };
    }
  } catch (error) {
    console.log(error);
    if (error.status === "Failed") {
      console.log(error);
      await client.set(json_msg.filename.toString(), JSON.stringify(error), {
        EX: 300,
      });
    } else if (error.status === "Runtime Error") {
      console.log("Error ---------->" + error);
      let ans = {
        status: "Runtime Error",
        stderr: error,
      };
      await client.set(json_msg.filename.toString(), JSON.stringify(ans), {
        EX: 300,
      });
    }
    await deletingTempFiles();
  }
  console.log("message acknowledged");
  await deletingTempFiles();
  channel.ack(msg);
}
module.exports = runCode;
