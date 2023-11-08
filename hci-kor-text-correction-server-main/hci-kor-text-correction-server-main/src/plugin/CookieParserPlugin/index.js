const cookieParser = require("cookie-parser");
class CookieParserPlugin {
  static initForExpress(server) {
    server.use(cookieParser());
  }
}

module.exports = CookieParserPlugin;
