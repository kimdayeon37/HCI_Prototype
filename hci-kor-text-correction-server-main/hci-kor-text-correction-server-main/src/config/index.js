const dotenv = require("dotenv");

const envFound = dotenv.config();

if (!envFound) throw new Error("⚠Couldn't find .env file");

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || "development",
  auth: {
    secret_token_slat_key: process.env.SECRET_TOKEN_SALT_SHAKEY || "",
    secret_passwd_slat_key: process.env.SECRET_PASSWD_SALT_SHAKEY || "",
    session_salt: process.env.SESSION_SECRET_SALT || " ",
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY || "",
    secretKey: process.env.AWS_SECRET_KEY || "",
  },
  api: {
    prefix: "/api",
  },
  mysql: {
    database: process.env.MYSQL_DATABASE || "",
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    dialect: "mysql",
    timezone: "+09:00",
    logging: this.env == "development" || false,
  },
  init: {
    rootuser: {
      id: "root",
      pw: "superUser1234!@#$",
    },
  },
};
