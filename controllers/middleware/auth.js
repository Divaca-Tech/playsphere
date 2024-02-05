const { StatusCodes } = require("http-status-codes");
import Jwt from "jsonwebtoken";
import { throwError } from "../../utils/helpers";

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throwError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    let decode;
    const token = authHeader?.split(" ")[1];
    decode = Jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
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
