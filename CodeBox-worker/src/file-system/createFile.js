const fs = require("fs/promises");
const { join } = require("path");
const runCode = require("../services/code-runner");
const deletingTempFiles = require("./deleteFile");

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
  go: "go",
};

async function createFiles(json_msg, channel, msg) {
  console.log(json_msg);
  try {
    await fs.writeFile(
      join(
        process.cwd(),
        `/temp/${json_msg.filename}.${extensions[json_msg.lang]}`
      ),
      json_msg.src
    );
    console.log("Source file created");
    runCode(json_msg, channel, msg);
  } catch (error) {
    console.log(error);
    deletingTempFiles();
    throw error;
  }
}

module.exports = createFiles;
