const { Router } = require("express");
const userRouters = require("./user.auth.route");

const router = Router();

router.use("/user", userRouters);

module.exports = router;
