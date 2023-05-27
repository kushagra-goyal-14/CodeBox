const { join } = require("path");

const commandMap = (filename, language) => {
  switch (language) {
    case "java":
      return {
        exCommand: "java",
        exArgs: [join(process.cwd(), `/temp/${filename}.java`)],
      };
    case "cpp":
      return {
        comCommand: "g++",
        comArgs: [
          join(process.cwd(), `/temp/${filename}.cpp`),
          "-o",
          join(process.cwd(), `/temp/${filename}.out`),
        ],
        exCommand: join(process.cwd(), `/temp/${filename}.out`),
      };
    case "py":
      return {
        exCommand: "python3",
        exArgs: [join(process.cwd(), `/temp/${filename}.py`)],
      };
    case "c":
      return {
        comCommand: "gcc",
        comArgs: [
          join(process.cwd(), `/temp/${filename}.c`),
          "-o",
          join(process.cwd(), `/temp/${filename}.out`),
        ],
        exCommand: join(process.cwd(), `/temp/${filename}.out`),
      };
    case "js":
      return {
        exCommand: "node",
        exArgs: [join(process.cwd(), `/temp/${filename}.js`)],
      };
    case "go":
      return {
        exCommand: "go",
        exArgs: ["run", join(process.cwd(), `/temp/${filename}.go`)],
      };
  }
};

module.exports = { commandMap };
