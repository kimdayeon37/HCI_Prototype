const useragent = require("express-useragent");
class UserAgentParserPlugin {
  static initForExpress(server) {
    server.use(useragent.express());
  }
}

module.exports = UserAgentParserPlugin;
