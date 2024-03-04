const express = require("express");
const formidableMiddleware = require("express-formidable");
const { auth } = require("../controllers/middleware/auth");
const { postReels, shareReel } = require("../controllers/reel.controller");

const reelRouter = express.Router();

reelRouter.post("/create-reel", auth, formidableMiddleware(), postReels);
reelRouter.post("/share", auth, shareReel);

module.exports = reelRouter;
