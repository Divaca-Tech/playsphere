const expressAsyncHandler = require("express-async-handler");
const { uploadMultipleFiles } = require("../utils/helpers");
const DB = require("../models");
const { StatusCodes } = require("http-status-codes");

const postReels = expressAsyncHandler(async (req, res, next) => {
  const { authId } = req;
  const files = req.files;
  const { content } = req.fields;

  let currentAttachments = [];
  let attachments = [];
  try {
    function pushRelevant(file) {
      attachments.push({
        filename: file[1].name,
        path: file[1].path,
      });
    }

    if (Object.keys(files).length) {
      currentAttachments = Object.entries(files);

      if (Array.isArray(currentAttachments)) {
        currentAttachments.map((file, index) => {
          pushRelevant(file);
        });
      } else {
        pushRelevant(currentAttachments);
      }

      const upload = await uploadMultipleFiles(attachments);
      const data = upload.map((file) => file.url);

      const stringifyData = JSON.stringify(data);

      const reel = await DB.reel.create({
        fileUrl: stringifyData,
        content: content,
      });

      await DB.reelShare.create({
        userId: authId,
        reelId: reel.id,
      });

      res.status(StatusCodes.OK).json({
        message: "reel successful",
        content: reel?.content,
        files: JSON.parse(reel?.fileUrl),
      });
    } else {
      const reel = await DB.reel.create({
        content: content,
      });
      await DB.reelShare.create({
        userId: authId,
        reelId: reel.id,
      });

      res.status(StatusCodes.OK).json({
        message: "reel successful",
        content: reel?.content,
      });
    }
  } catch (error) {
    next(error);
  }
});

const shareReel = expressAsyncHandler(async (req, res, next) => {
  const { authId } = req;
  const { userId, reelId } = req.body;

  try {
    const reelSharedToSamePersonBySameUser = await DB.reelShare.findOne({
      where: {
        reelId: Number(reelId),
        sharedById: authId,
        userId: userId,
      },
    });

    if (reelSharedToSamePersonBySameUser) {
      return res.status(StatusCodes.OK).json({
        message: "reel shared successful",
      });
    }

    await DB.reelShare.create({
      reelId: Number(reelId), // Corrected field name from realId to reelId
      sharedById: authId,
      userId: userId,
    });

    res.status(StatusCodes.OK).json({
      message: "reel shared successful",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { postReels, shareReel };
