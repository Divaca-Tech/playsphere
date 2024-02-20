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
        const user = await DB.user.findOne({
            where: {
                id : userId,
            },
        });

        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }
     
        const post = await DB.post.findOne(
        {
            where: {
                id : postId,
            },
        });

        if(!post){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Post does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }

        const Comment = await DB.comment.findOne(
        {
            where: {
                id : commentId,
            },
        });

        if(!Comment){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Comment does not exist does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }

        await DB.like.create({
            isLiked,
            commentId,
            userId,
            postId
        });        
  
        res.status(StatusCodes.OK).json({
            message: "Comment has been like",
            status: StatusCodes.NO_CONTENT,
        });
    } catch (error) {
      next(error);
    }
});

const UnlikeComment = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
    }
  
    const {likeId, userId, postId, } = req.body;
  
    try {

        const user = await DB.user.findOne({
            where: {
                id : userId,
            },
        });

        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }
     
        const post = await DB.post.findOne(
        {
            where: {
                id : postId,
            },
        });

        if(!post){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Post does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }

        const Comment = await DB.like.findOne(
        {
            where: {
                id : likeId,
            },
        });

        if(!Comment){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Comment does not exist does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }

        await DB.like.update(
        { isLiked : false },
        {
            where: {
                id : likeId,
            },
        });    
  
        res.status(StatusCodes.OK).json({
            message: "Comment has been unlike",
            status: StatusCodes.OK,
        });
    } catch (error) {
      next(error);
    }
});

module.exports = {
    LikeComment,
    UnlikeComment
};