const express = require("express");
const {
  uploadFiles,
  createPost,
  GetUserPosts,
  UpdatePost,
  DeletePost,
  GetUserPostAttachment,
  getSingleUserPostCommentReplyAndLikes,
  getAllUsersPostCommentsReplysAndLikes,
} = require("../controllers/post.controller");
const { check } = require("express-validator");
const { auth } = require("../controllers/middleware/auth");

const postRouters = express.Router();

postRouters.post("/upload-file", uploadFiles);

postRouters.post(
  "/create",
  check("content", "Please provide post content").not().isEmpty(),
  check("userId", "Please provide associate userId").not().isEmpty(),
  createPost
);

postRouters.get("/", GetUserPosts);

postRouters.put(
  "/update",
  check("userId", "Please provide associate userId").not().isEmpty(),
  check("content", "Please provide post content").not().isEmpty(),
  check("postId", "Please provide  post id").not().isEmpty(),
  UpdatePost
);

postRouters.delete(
  "/delete",
  check("userId", "Please provide associate userId").not().isEmpty(),
  check("postId", "Please provide  post id").not().isEmpty(),
  DeletePost
);
postRouters.get("/attachment", GetUserPostAttachment);

postRouters.get(
  "/single-user-post",
  auth,
  getSingleUserPostCommentReplyAndLikes
);
postRouters.get("/all-user-post", getAllUsersPostCommentsReplysAndLikes);

module.exports = postRouters;
