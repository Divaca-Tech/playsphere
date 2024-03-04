const { Router } = require("express");
const userRouters = require("./user.auth.route");
const postRouters = require("./post.route");
const likeRouters = require("./like.route");
const commentRouter = require("./comment.route");
const replyRouter = require("./reply.route");
const reelRouter = require("./reel.route");

const router = Router();

router.use("/user", userRouters);

router.use("/post", postRouters);

router.use("/like", likeRouters);

router.use("/comment", commentRouter);
router.use("/reply", replyRouter);
router.use("/reel", reelRouter);

module.exports = router;
