const crypto = require("crypto");

function random(size) {
  return crypto.randomBytes(size).toString("hex");
}

module.exports = random;
