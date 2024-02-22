const expressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const { StatusCodes } = require("http-status-codes");
const { uploadMultipleFiles, throwError } = require("../utils/helpers");
const { validationResult } = require("express-validator");
validationResult;
const postCommentReply = expressAsyncHandler(async (req, res, next) => {
  const { authId } = req;
  const files = req.files;

  const { commentId, content } = req.fields;

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

      const reply = await DB.reply.create({
        fileUrl: stringifyData,
        content: content,
        commentId: commentId,
        userId: authId,
      });

      res.status(StatusCodes.OK).json({
        message: "reply succussful ",
        reply: reply?.content,
        files: JSON.parse(reply?.fileUrl),
      });
    } else {
      const reply = await DB.reply.create({
        content: content,
        commentId: commentId,
        userId: authId,
      });

      res.status(StatusCodes.OK).json({
        message: "reply succussful ",
        reply: reply.content,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { postCommentReply };
