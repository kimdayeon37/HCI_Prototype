const createError = require("http-errors");

const router = require("../../router");

class RouterPlugin {
  static initForExpress(server) {
    server.use("/", router);
    server.use(function (req, res, next) {
      res.status(404);
      res.json({
        success: false,
        status: res.statusCode,
        message: {
          text: "요청하신 API 는 존재하지 않습니다.",
        },
      });
    });
  }
}

module.exports = RouterPlugin;
