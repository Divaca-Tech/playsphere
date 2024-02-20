const { StatusCodes } = require("http-status-codes");
const expressAsyncHandler = require("express-async-handler");
const DB = require("../models/index");
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");
dotenv.config({ path: "./.env" });
const {
    throwError
  } = require("../utils/helpers");

const LikeComment = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
    }
  
    const { isLiked, commentId, userId, postId } = req.body;
  
    try {
        const like = await DB.like.create({
            isLiked,
            commentId,
            userId,
            postId
        });

        
  
        res.status(StatusCodes.OK).json({
            message: "Comment has been like",
            status: StatusCodes.NO_CONTENT,
            like
        });
    } catch (error) {
      next(error);
    }
});

module.exports = {
    LikeComment,
};