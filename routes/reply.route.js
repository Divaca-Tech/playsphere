const express = require("express");
const {
  postCommentReply,
  deleteRelply,
  updateReply,
} = require("../controllers/Reply");
const { auth } = require("../controllers/middleware/auth");
const formidableMiddleware = require("express-formidable");

const replyRouter = express.Router();

replyRouter.post(
  "/reply-comment",
  auth,
  formidableMiddleware(),
  postCommentReply
);
replyRouter.delete("/delete-comment-reply/:replyId", auth, deleteRelply);
replyRouter.post("/update", auth, updateReply);

module.exports = replyRouter;
