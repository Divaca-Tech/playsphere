const express = require("express");
const {
   uploadFiles, createPost, GetUserPosts,
} = require("../controllers/post.controller");
const { check } = require("express-validator");

const postRouters = express.Router();

postRouters.post(
    "/upload-file",
    uploadFiles
);

postRouters.post(
    "/create-post",
    check("content", "Please provide post content").not().isEmpty(),
    check("userId", "Please provide associate userId").not().isEmpty(),
    createPost
);

postRouters.get(
    "/getpost",
    check("userId", "Please provide associate userId").not().isEmpty(),
    GetUserPosts
);


module.exports = postRouters;