class AuthenticationPlugin {
  static _getToken() {
    return "";
  }
  static _getUserInfo() {
    return {};
  }
  static _doRelogin(ReloginToken) {}
  static async _preAuthentication(req, res, next) {
    req.auth = { is_login: false };
    next();
  }
  static async initAuthentication(server) {
    server.use(this._preAuthentication);
  }
}
module.exports = AuthenticationPlugin;
