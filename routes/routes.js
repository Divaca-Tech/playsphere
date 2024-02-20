const { Router } = require("express");
const userRouters = require("./user.auth.route");
const postRouters = require("./post.route");
const likeRouters = require("./like.route");

const router = Router();

router.use("/user", userRouters);

router.use("/post", postRouters);

router.use("/like", likeRouters);

module.exports = router;
