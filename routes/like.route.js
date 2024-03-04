const express = require("express");
const {
  LikeComment,
  UnlikeComment,
  likeOrUnlikeReply,
  likeOrUnlikePost,
  likeOrUnlikeStory,
} = require("../controllers/like.controller");
const { check } = require("express-validator");
const { auth } = require("../controllers/middleware/auth");

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

likeRouters.post("/like-reply", auth, likeOrUnlikeReply);
likeRouters.post("/like-post", auth, likeOrUnlikePost);
likeRouters.post("/like-story", auth, likeOrUnlikeStory);

module.exports = likeRouters;
