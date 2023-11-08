const cors = require("cors");
class CorsPlugin {
  static initForExpress(server, origin = ["*"], credentials = true) {
    server.use(cors({ origin, credentials }));
  }
}

module.exports = CorsPlugin;
