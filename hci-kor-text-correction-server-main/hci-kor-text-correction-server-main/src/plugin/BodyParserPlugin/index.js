const bodyParser = require("body-parser");
class BodyParserPlugin {
  static initJSON(server, option = { limit: "2gb" }) {
    server.use(bodyParser.json(option));
  }
  static initURLEncoded(server, option = { limit: "2gb", extended: true }) {
    server.use(bodyParser.urlencoded(option));
  }
}

module.exports = BodyParserPlugin;
