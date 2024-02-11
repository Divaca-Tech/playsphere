const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
module.exports = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  BACKEND_URL: process.env.BACKEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  EMAIL: process.env.EMAIL,
  HOST: process.env.HOST,
};
