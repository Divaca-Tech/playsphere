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

const uploadFiles = expressAsyncHandler(async (req, res, next, files, postId) => {
    
 
    try {

        if(Object.entries(files).length == 0){
            res.status(StatusCodes.BAD_REQUEST).json({"message" : "Please select a file"})
            return
        }

        for (let i = 0; i < Object.entries(files.file).length; i++) {
            cloudinary.uploader.upload(files.file[i].filepath, (error, result) => {
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
                } else {
                    DB.postAttachment.create({
                        file : result.url,
                        postId
                    })

                    if(i < Object.entries(files).length){
                        return res.status(StatusCodes.OK).json({
                            message: "Post is created and file is uploaded successfully",
                            status: StatusCodes.OK,
                        });
                    }
                }
            });
        }
    
    } catch (error) {
      next(error);
    }
});

const createPost = expressAsyncHandler(async (req, res, next) => {
    const isMultipart = req.is('multipart/form-data');
    if(!isMultipart){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Form must be of type 'multipart/form-data'. "})
    }

    const form = new formidable.IncomingForm();
    form.multiples = true;
  
    try {

        form.parse(req, (err, fields, files) => {
            if( !fields.userId ||  !fields.content){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Validation error",
                    status: StatusCodes.BAD_REQUEST,
                });
            }

            DB.user.findOne({
                where: {
                    id : fields.userId[0],
                },
            }) 
            .then(user => {
               if(!user){
                    return res.status(StatusCodes.NOT_FOUND).json({
                        message: "User does not exist",
                        status: StatusCodes.NOT_FOUND,
                    });
               }
               
                DB.post.create({
                    content : fields.content[0],
                    userId : fields.userId[0]
                })
                .then(post => {
                    if(Object.entries(files).length == 0){
                        return res.status(StatusCodes.CREATED).json({
                            message: "Post is created successfully",
                            status: StatusCodes.CREATED,
                        });
                    }

                    return uploadFiles(req, res, next, files, post.id);
                    
                })
                .catch(err => {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        status: StatusCodes.BAD_REQUEST,
                        error : err
                    });
                });
            })

        })
     

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
            return res.status(StatusCodes.NOT_FOUND).json({
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

const GetUserPostAttachment = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation failed", StatusCodes.BAD_REQUEST, true);
    }
  
    const { userId, postId } = req.body;
  
    try {
        if(userId){
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
                        userId
                    },
            });
    
            if(!post){
                return res.status(StatusCodes.OK).json({
                    message: "Post does not exist",
                    status: StatusCodes.NOT_FOUND,
                });
            }
        }
        
        if(postId){
            const postAttachment = await DB.postAttachment.findAll({
                where: {
                    postId
                },
            });

           return res.status(StatusCodes.OK).json({
                message: "postAttachment fetch successfully",
                status: StatusCodes.OK,
                postAttachment
            });
        }

        
        const postAttachment = await DB.postAttachment.findAll();
  
        res.status(StatusCodes.OK).json({
            message: "postAttachment fetch successfully",
            status: StatusCodes.OK,
            postAttachment
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
            return res.status(StatusCodes.OK).json({
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
    DeletePost,
    GetUserPostAttachment,
};