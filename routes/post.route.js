const express = require("express");
const {
   uploadFiles,
} = require("../controllers/post.attachment.controller");
const { check } = require("express-validator");

const postRouters = express.Router();

postRouters.post(
    "/upload-file",
    uploadFiles
);


module.exports = postRouters;