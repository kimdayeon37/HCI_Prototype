const Sentry = require("@sentry/node");
const env = process.env.NODE_ENV || "development";
const is_development = env == "development";
class SentryPlugin {
  static initForExpress(server) {
    if (is_development) return;
    Sentry.init({
      dsn: "http://19ab83cb18c74bb19a32840de89b8809@dev.jwmsg.net:9000/2",
      tracesSampleRate: 1.0,
    });
    server.use(Sentry.Handlers.requestHandler());
  }
  static captureException(err) {
    if (is_development) return;
    Sentry.captureException(err);
  }
}

module.exports = SentryPlugin;
