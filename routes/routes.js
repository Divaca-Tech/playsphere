const { Router } = require("express");
const userRouters = require("./user.auth.route");
const postRouters = require("./post.route");

const router = Router();

router.use("/user", userRouters);

router.use("/post", postRouters);

module.exports = router;
