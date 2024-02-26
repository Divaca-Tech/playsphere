const express = require("express");
const {
  postComment,
  deleteComment,
  updateCommentText,
} = require("../controllers/comment.controller");
const formidableMiddleware = require("express-formidable");
const { auth } = require("../controllers/middleware/auth");

const commentRouter = express.Router();

commentRouter.post("/post", auth, formidableMiddleware(), postComment);
commentRouter.delete("/delete/:commentId", auth, deleteComment);
commentRouter.patch("/update", auth, updateCommentText);

module.exports = commentRouter;
