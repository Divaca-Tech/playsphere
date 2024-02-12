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
} = require("../utils/helpers");
const DB = require("../models/index");
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

cloudinary.config({
  cloud_name: 'dipxop2dr',
  api_key: '628448886461797',
  api_secret: 'yPv7TmoXdg-FLYIYknXBssYwFwc'
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