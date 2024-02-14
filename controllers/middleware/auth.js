const { StatusCodes } = require("http-status-codes");
const Jwt = require("jsonwebtoken");
const { throwError } = require("../../utils/helpers");
const config = require("../../config/config");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throwError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    let decode;
    const token = authHeader?.split(" ")[1];
    decode = Jwt.verify(token, `${config.JWT_SECRET}`);
    if (!token || !decode) {
      throwError("Invalid token");
    }
    req.authId = decode.authId;
    req.email = decode.email;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
