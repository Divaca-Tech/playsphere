const express = require("express");
const {
   uploadFiles, createPost, GetUserPosts, UpdatePost, DeletePost, GetUserPostAttachment,
} = require("../controllers/post.controller");
const { check } = require("express-validator");

const postRouters = express.Router();

postRouters.post(
    "/upload-file",
    uploadFiles
);

postRouters.post(
    "/",
    check("content", "Please provide post content").not().isEmpty(),
    check("userId", "Please provide associate userId").not().isEmpty(),
    createPost
);

postRouters.get(
    "/",
    GetUserPosts
);

postRouters.put(
    "/",
    check("userId", "Please provide associate userId").not().isEmpty(),
    check("content", "Please provide post content").not().isEmpty(),
    check("postId", "Please provide  post id").not().isEmpty(),
    UpdatePost
);

postRouters.delete(
    "/",
    check("userId", "Please provide associate userId").not().isEmpty(),
    check("postId", "Please provide  post id").not().isEmpty(),
    DeletePost
);

postRouters.get(
    "/attachment",
    GetUserPostAttachment
);

module.exports = postRouters;