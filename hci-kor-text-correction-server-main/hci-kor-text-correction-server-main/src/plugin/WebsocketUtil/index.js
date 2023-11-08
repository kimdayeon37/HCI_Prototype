const socketIO = require("socket.io");
class WebsocketPlugin {
  static initWebSocketServer(server) {
    server.socketIO = socketIO();
  }
}

module.exports = WebsocketPlugin;
