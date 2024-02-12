const { StatusCodes } = require("http-status-codes");
const expressAsyncHandler = require("express-async-handler");
const DB = require("../models/index");
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFiles = expressAsyncHandler(async (req, res, next) => {
 
    try {
        const form = new formidable.IncomingForm();
        form.multiples = true;

        form.parse(req, (err, fields, files) => {
            Object.entries(files).length == 0 ? res.status(StatusCodes.BAD_REQUEST).json({"message" : "Please select a file"}) : null;
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
                            res.status(StatusCodes.OK).json({message: "File is uploaded successfully"})
                        }
                    }
                });
            }
        });
      
    } catch (error) {
      next(error);
    }
});


module.exports = {
    uploadFiles,
};