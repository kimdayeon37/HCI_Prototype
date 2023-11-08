const SentryPlugin = require("../SentryPlugin");
class ErrorHandler {
  static expressInitial(server) {
    server.use((err, req, res, next) => {
      SentryPlugin.captureException(err);
      res.status(500);
      res.json({
        success: false,
        status: res.statusCode,
        message: {
          text: "오류가 발생했습니다. 확인 후 빠르게 해결하겠습니다! 🙇",
          error: { data: err },
        },
      });
      next(err);
    });
  }
}

module.exports = ErrorHandler;
