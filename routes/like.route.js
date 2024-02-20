const express = require("express");
const {
   LikeComment, UnlikeComment,
} = require("../controllers/like.controller");
const { check } = require("express-validator");

const likeRouters = express.Router();

likeRouters.post(
    "/comment",
    check("postId", "Please provide  post id").not().isEmpty(),
    check("isLiked", "Bolean").not().isEmpty(),
    check("commentId", "Please provide  comment id").not().isEmpty(),
    check("userId", "Please provide  user id").not().isEmpty(),
    LikeComment
);

likeRouters.post(
    "/unlike-comment",
    check("postId", "Please provide  post id").not().isEmpty(),
    check("likeId", "Please provide  like id").not().isEmpty(),
    check("userId", "Please provide  user id").not().isEmpty(),
    UnlikeComment
);


module.exports = likeRouters;