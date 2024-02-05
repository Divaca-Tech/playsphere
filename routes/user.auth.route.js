const express = require("express");
const {
  createUser,
  confirmOTP,
  requestOtp,
  login,
  resetPassword,
  confirmPasswordReset,
} = require("../controllers/user.controller");
const { check } = require("express-validator");

const userRouters = express.Router();

userRouters.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail().not().isEmpty(),
    check("name", "Please enter your name").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  createUser
);

userRouters.post(
  "/confirm-otp",
  [
    check("OTP", "Please enter a valid otp").not().isEmpty(),
    check("email", "Please include a valid email").isEmail().not().isEmpty(),
  ],
  confirmOTP
);

userRouters.post(
  "/request-otp",
  [check("email", "Please include a valid email").isEmail().not().isEmpty()],
  requestOtp
);

userRouters.post(
  "/signin",
  [
    check("email", "Please include a valid email").isEmail().not().isEmpty(),

    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  login
);
userRouters.patch(
  "/request-password-reset",
  [check("email", "Please include a valid email").isEmail().not().isEmpty()],
  resetPassword
);

userRouters.post(
  "/confirm-password-reset",
  [
    check("pin", "Please enter a valid pin").not().isEmpty(),
    check("email", "Please include a valid email").isEmail().not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  confirmPasswordReset
);
module.exports = userRouters;
