const { compileService } = require("../services/index.js");
class compileController {
  constructor() {
    this.compileService = new compileService();
  }

  runCode = async (req, res) => {
    try {
      const resp = await this.compileService.runCode(req);
      return res.status(202).json({
        message: "Successfully ran it",
        data: resp,
        err: {},
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
  getStatus = async (req, res) => {
    try {
      const filename = req.params.filename;
      const resp = await this.compileService.getStatus(filename);
      return res.status(202).json({
        message: "Successfully got it",
        data: resp,
        err: {},
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
}
module.exports = new compileController();
