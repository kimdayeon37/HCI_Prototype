const fileUpload = require("express-fileupload");

class FileUploadPlugin {
  static initForExpress(server, option) {
    const p_opt = option || {
      limits: { fileSize: 2048 * 1024 * 1024 }, //MAX 2GB
      useTempFiles: true,
      tempFileDir: "tmp/",
    };
    server.use(fileUpload(p_opt));
  }
}

module.exports = FileUploadPlugin;
