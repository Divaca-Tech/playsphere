const express = require("express");
const {
   LikeComment,
} = require("../controllers/like.controller");
const { check } = require("express-validator");

const likeRouters = express.Router();

likeRouters.post(
    "/comment",
    check("postId", "Please provide  post id").not().isEmpty(),
    check("isLiked", "Please provide  post id").not().isEmpty(),
    check("commentId", "Please provide  post id").not().isEmpty(),
    check("userId", "Please provide  post id").not().isEmpty(),
    LikeComment
);


module.exports = likeRouters;