const express = require("express");
const { compileController } = require("../../controller/index");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("successfully made the get request");
});
router.post("/submit", compileController.runCode);
router.get("/results/:filename", compileController.getStatus);

module.exports = router;
