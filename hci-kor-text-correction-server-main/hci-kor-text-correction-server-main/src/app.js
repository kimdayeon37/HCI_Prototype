const express = require("express");
const socketIO = require("socket.io");
const config = require("./config");

const SentryPlugin = require("./plugin/SentryPlugin");
const BodyParserPlugin = require("./plugin/BodyParserPlugin");
const CookieParserPlugin = require("./plugin/CookieParserPlugin");
const UserAgentParserPlugin = require("./plugin/UserAgentParserPlugin");
const CorsPlugin = require("./plugin/CorsPlugin");
const FileUploadPlugin = require("./plugin/FileUploadPlugin");
const RouterPlugin = require("./plugin/RouterPlugin");
const ErrorHandler = require("./plugin/ErrorHandler");
const AuthenticationPlugin = require("./plugin/AuthenticationPlugin");

const init_server = async (app) => {
  SentryPlugin.initForExpress(app);
  CookieParserPlugin.initForExpress(app);
  UserAgentParserPlugin.initForExpress(app);
  BodyParserPlugin.initJSON(app, { limit: "2gb" });
  BodyParserPlugin.initURLEncoded(app, { limit: "2gb", extended: true });
  CorsPlugin.initForExpress(app);
  FileUploadPlugin.initForExpress(app);
  AuthenticationPlugin.initAuthentication(app);
  RouterPlugin.initForExpress(app);
  ErrorHandler.expressInitial(app);

  const server = app.listen(config.port, () => {
    console.info(`>>[SERVER] Ready on http://localhost:${config.port}`);
    console.info(`>>[SERVER] SocketIO Ready on ${config.port} too.`);
  });

  server.socketIO = socketIO();
  server.socketIO.attach(server);

  return server;
};

const app = express();
const server = init_server(app);

module.exports = server;
