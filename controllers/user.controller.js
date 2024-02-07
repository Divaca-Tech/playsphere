// const DB = require("../db");

const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const expressAsyncHandler = require("express-async-handler");
const fse = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")
const {
  throwError,
  hashPassword,
  JWTToken,
  comparePassword,
  sendEmail,
  reqTwoFactorAuth,
  verifyTwoFactorAuth,
  companyLogoUrl,
} = require("../utils/helpers");
const DB = require("../models/index");

const createUser = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
  }

  const { email, password, name } = req.body;

  try {
    // const findUser = await DB.User.findOne({ where: { email: email } });
    const findUser = await DB.user.findOne({ where: { email: email } });
    if (findUser) {
      throwError("User already exists", StatusCodes.BAD_REQUEST, true);
    }
    const hashedPassword = await hashPassword(password);
    const { token, secret } = await reqTwoFactorAuth();

    const template = fse.readFileSync(
      path.join(__dirname, "../views/otp-mail.ejs"),
      "utf-8"
    );
    const title = "OTP confirmation";
    const message = "Please enter your OTP to complete your registration";
    const html = ejs.render(template, {
      logoUrl: companyLogoUrl,
      title,
      token,
      message,
    });
    await sendEmail(html, email, title);
    const user = await DB.user.create({
      email,
      password: hashedPassword,
      otp: token,
      token: secret,
      name,
      otp_exp_time: `${new Date().getTime()}`,
      is_otp_verified: false,
    });

    res.status(StatusCodes.OK).json({
      message: "Check your mail to confirm your registration",
      status: StatusCodes.OK,
      otp: user.otp,
    });
  } catch (error) {
    next(error);
  }
});

const confirmOTP = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError("Invalid inputs", StatusCodes.BAD_REQUEST, true);
  }
  try {
    const userOtp = await DB.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userOtp) {
      throwError("Invalid user", StatusCodes.BAD_REQUEST, true);
    }

    const startTime = Number(userOtp.otp_exp_time);
    const endTime = new Date().getTime();

    const difference = endTime - startTime;

    const timeInMinute = difference / (1000 * 60);

    if (timeInMinute > 4) {
      throwError("OTP expired", StatusCodes.BAD_REQUEST, true);
    }
    if (userOtp?.is_otp_verified) {
      throwError("OTP has been used", StatusCodes.BAD_REQUEST, true);
    }
    const secret = userOtp.token;
    const isOtpValid = verifyTwoFactorAuth(req.body.OTP, secret);
    if (!isOtpValid) {
      throwError("Invalid OTP", StatusCodes.BAD_REQUEST, true);
    }
    await DB.user.update(
      {
        is_otp_verified: 1,
      },
      {
        where: {
          id: userOtp.id,
        },
      }
    );

    res.status(StatusCodes.OK).json({
      message: "OTP confirmed successfully",
      status: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
});

const requestOtp = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
  }
  try {
    const { email } = req.body;

    const { token, secret } = await reqTwoFactorAuth();

    const template = fse.readFileSync(
      path.join(__dirname, "../views/otp-mail.ejs"),
      "utf-8"
    );
    const title = "OTP confirmation";
    const message = "Please enter your OTP to complete your registration";
    const html = ejs.render(template, {
      logoUrl: companyLogoUrl,
      title,
      token,
      message,
    });
    const user = await DB.user.findOne({ email });
    if (!user) {
      throwError("Invalid user", StatusCodes.BAD_REQUEST, true);
    }

    // await sendEmail(html, email, title);
    await DB.user.update(
      {
        otp: token,
        token: secret,
        otp_exp_time: `${new Date().getTime()}`,
        is_otp_verified: false,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(StatusCodes.OK).json({
      message: "OTP resent successfully",
      status: StatusCodes.OK,
      otp: token,
    });
  } catch (error) {
    next(error);
  }
});

const login = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
  }

  try {
    const { email, password } = req.body;
    const user = await DB.user.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throwError("Invalid user", StatusCodes.BAD_REQUEST, true);
    }
    await comparePassword(password, user.password);
    const token = JWTToken(email, user.id);
    res.status(StatusCodes.OK).json({
      message: "login successful",
      status: StatusCodes.OK,
      token,
    });
  } catch (error) {
    next(error);
  }
});

const resetPassword = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
  }

  try {
    const { email } = req.body;
    const user = await DB.user.findOne({ email });

    if (!user) {
      throwError("Invalid user", StatusCodes.BAD_REQUEST, true);
    }

    const { token, secret } = await reqTwoFactorAuth();
    await DB.user.update(
      {
        otp: token,
        token: secret,
        otp_exp_time: `${new Date().getTime()}`,
      },
      {
        where: { id: user?.id },
      }
    );

    const template = fse.readFileSync(
      path.join(__dirname, "../views/otp-mail.ejs"),
      "utf-8"
    );
    const title = "Password Reset";
    const message = "Please enter this PIN to reset your password";
    const html = ejs.render(template, {
      logoUrl: companyLogoUrl,
      title,
      token,
      message,
    });
    // await sendEmail(html, email, title);
    res.status(StatusCodes.OK).json({
      message: "password reset pin sent",
      status: StatusCodes.OK,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

const confirmPasswordReset = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
  }

  try {
    const { password, pin, email } = req.body;
    const user = await DB.user.findOne({
      email: email,
    });

    if (!user) {
      throwError("Invalid user", StatusCodes.BAD_REQUEST, true);
    }
    const secret = user.token;
    // const isOtpValid = await verifyTwoFactorAuth(pin, secret);

    // // if (!isOtpValid) {
    // //   throwError("Invalid PIN", StatusCodes.BAD_REQUEST, true);
    // // }
    if (pin !== user.otp) {
      throwError("Invalid PIN", StatusCodes.BAD_REQUEST, true);
    }
    const hash = await hashPassword(password);
    await DB.user.update(
      { password: hash, is_otp_verified: true },
      {
        where: { id: user?.id },
      }
    );

    const template = fse.readFileSync(
      path.join(__dirname, "../views/otp-mail.ejs"),
      "utf-8"
    );
    const title = "Password Reset";
    const message = "Your password has been reset successfully";
    const html = ejs.render(template, {
      logoUrl: companyLogoUrl,
      title,
      token: "",
      message,
    });
    await sendEmail(html, email, title);
    res.status(StatusCodes.OK).json({
      message: "password resett successfully",
      status: StatusCodes.OK,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

const googAuth = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
  }

  const { email, phoneNumber, name, accessToken, photoUrl } = req.body;

  // const decoded = jwtDecode.jwtDecode("token")

  try {
    const findUser = await DB.user.findOne({ where: { email: email } });
    if (findUser) {
      const token = JWTToken(email, findUser.id);
      res.status(StatusCodes.OK).json({
        message: "login successful",
        status: StatusCodes.OK,
        token,
      });
      return;
    }
    
    const hashedPassword = await hashPassword(email);

    await DB.user.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      photoUrl,
    });

    const token = JWTToken(email, accessToken)
    res.status(StatusCodes.OK).json({
      message: "User registration is successful",
      status: StatusCodes.OK,
      token
    });

  } catch (error) {
    next(error);
  }
});

module.exports = {
  createUser,
  confirmOTP,
  requestOtp,
  login,
  resetPassword,
  confirmPasswordReset,
  googAuth,
};
