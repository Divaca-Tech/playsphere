const jwt = require("jsonwebtoken");
const { createTransport } = require("nodemailer");
const bycrypt = require("bcrypt");
const Speakeasy = require("speakeasy");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const config = require("../config/config");

const throwError = (errorMsg, statusCode, validationError) => {
  const error = new Error(errorMsg);
  error.statusCode = statusCode;
  error.validationError = validationError;
  throw error;
};
const salt = async () => await bycrypt.genSalt(10);
const companyLogoUrl = `${config.BACKEND_URL}/images/company-logo.svg`;

const hashPassword = async (password) => {
  const hash = await bycrypt.hash(password, await salt());

  return hash;
};

const JWTToken = (email, authId) => {
  const token = jwt.sign(
    {
      email,
      authId,
    },
    `${config.JWT_SECRET}`,
    {
      expiresIn: "30d",
    }
  );

  return token;
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bycrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throwError("Invalid password", StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.error(error);
    throwError("Invalid password", StatusCodes.BAD_REQUEST);
  }
};

const sendEmail = async function (content, to, subject) {
  const mailOption = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    html: content,
  };

  try {
    const transport = createTransport({
      host: config.HOST, // Example: 'smtp.yourprovider.com'
      port: 465,
      secure: true,
      auth: {
        user: config.EMAIL,
        pass: config.MAIL_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const info = await transport.sendMail(mailOption);

    return info;
  } catch (error) {
    console.log(error);
  }
};

async function reqTwoFactorAuth() {
  const secret = Speakeasy.generateSecret({ length: 10 });

  const token = Speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    step: 240,
    digits: 4,
  });

  return { token, secret: secret.base32 };
}

async function verifyTwoFactorAuth(token, secret) {
  const isValid = Speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
    step: 240,
  });

  return isValid;
}

module.exports = {
  throwError,
  salt,
  hashPassword,
  JWTToken,
  comparePassword,
  sendEmail,
  reqTwoFactorAuth,
  verifyTwoFactorAuth,
  companyLogoUrl,
};
