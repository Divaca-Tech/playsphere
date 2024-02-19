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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFiles = expressAsyncHandler(async (req, res, next) => {
    
    const isMultipart = req.is('multipart/form-data');
    if(!isMultipart){
        res.status(StatusCodes.BAD_REQUEST).json({message: "Form must be of type 'multipart/form-data'. "})
    }
 
    try {
        const form = new formidable.IncomingForm();
        form.multiples = true;

        form.parse(req, (err, fields, files) => {
            if(Object.entries(files).length == 0){
                res.status(StatusCodes.BAD_REQUEST).json({"message" : "Please select a file"})
                return
            }
            
            err ? res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err}) : null;

            for (let i = 0; i < Object.entries(files.file).length; i++) {
                cloudinary.uploader.upload(files.file[i].filepath, (error, result) => {
                    if (error) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
                    } else {
                        DB.postAttachment.create({
                            file : result.url,
                        })

                        if(i < Object.entries(files).length){
                            // return "File is uploaded successfully";
                            res.status(StatusCodes.OK).json({message: "File was uploaded successfully"})
                        }
                    }
                });
            }
        });
      
    } catch (error) {
      next(error);
    }
});

const createPost = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
    }
  
    const { content, userId } = req.body;
  
    try {
     
      const post = await DB.post.create({
        content,
        userId
      });
  
      res.status(StatusCodes.CREATED).json({
        message: "Post is created successfully",
        status: StatusCodes.CREATED,
        post
      });
    } catch (error) {
      next(error);
    }
});

const GetUserPosts = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
    }
  
    const { userId } = req.body;
  
    try {
        const user = await DB.user.findOne({
            where: {
                id : userId,
            },
        });

        if(!user){
            return res.status(StatusCodes.OK).json({
                message: "User does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }
     
        const post = await DB.post.findAll({
            where: {
                userId,
            },
        });
  
      res.status(StatusCodes.OK).json({
        message: "User post fetch successfully",
        status: StatusCodes.OK,
        post
      });
    } catch (error) {
      next(error);
    }
});

const UpdatePost = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
    }
  
    const { userId, postId, content } = req.body;
  
    try {
        const user = await DB.user.findOne({
            where: {
                id : userId,
            },
        });

        if(!user){
            return res.status(StatusCodes.OK).json({
                message: "User does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }
     
        const post = await DB.post.update(
        { content },
        {
            where: {
                id : postId,
                userId
            },
        });

        if(post == 0){
           return  res.status(StatusCodes.OK).json({
                message: "This user post does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }
  
        res.status(StatusCodes.OK).json({
            message: "Post updated successfully",
            status: StatusCodes.OK,
        });
    } catch (error) {
      next(error);
    }
});

const DeletePost = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
    }
  
    const { userId, postId } = req.body;
  
    try {
        const user = await DB.user.findOne({
            where: {
                id : userId,
            },
        });

        if(!user){
            return res.status(StatusCodes.OK).json({
                message: "User does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }
     
        const post = await DB.post.findOne(
        {
            where: {
                id : postId,
                userId
            },
        });

        if(!post){
            res.status(StatusCodes.OK).json({
                message: "Post does not exist",
                status: StatusCodes.NOT_FOUND,
            });
        }

        post.destroy();
  
        res.status(StatusCodes.OK).json({
            message: "Post deleted successfully",
            status: StatusCodes.NO_CONTENT,
        });
    } catch (error) {
      next(error);
    }
});

module.exports = {
    uploadFiles,
    createPost,
    GetUserPosts,
    UpdatePost,
    DeletePost
};