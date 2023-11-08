const moment = require("moment");
class ResponseUtil {
  static ResponseSuccess200(req, res, param) {
    const serverTime = moment();
    const extinfo = {
      server_time: {
        full: serverTime.format("yyyy-MM-DD hh:mm:ss.SSS Z"),
        date: serverTime.format("yyyy-MM-DD"),
        time: serverTime.format("hh:mm:ss.SSS"),
        timezone: serverTime.format("Z"),
      },
    };
    const reqinfo = {
      request: {
        originalUrl: req.originalUrl,
        baseUrl: req.baseUrl,
        path: req.path,
        host: req.hostname,
      },
    };
    const authinfo = {
      login: {
        is_login: req.auth.is_login || false,
        user_info: req.auth.user_info || null,
      },
    };
    res.json({
      success: true,
      ...param,
      extinfo,
      reqinfo,
      authinfo,
    });
    res.end();
  }
  static ResponseFail200(req, res, param) {
    const serverTime = moment();
    const extinfo = {
      server_time: {
        full: serverTime.format("yyyy-MM-DD hh:mm:ss.SSS Z"),
        date: serverTime.format("yyyy-MM-DD"),
        time: serverTime.format("hh:mm:ss.SSS"),
        timezone: serverTime.format("Z"),
      },
    };
    const reqinfo = {
      request: {
        originalUrl: req.originalUrl,
        baseUrl: req.baseUrl,
        path: req.path,
        host: req.hostname,
      },
    };
    const authinfo = {
      login: {
        is_login: req.auth.is_login || false,
        user_info: req.auth.user_info || null,
      },
    };
    res.json({
      success: false,
      ...param,
      extinfo,
      reqinfo,
      authinfo,
    });
    res.end();
  }
}

module.exports = ResponseUtil;
