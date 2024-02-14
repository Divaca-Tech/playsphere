const formidable = require("express-formidable");
const expressAsyncHandler = require("express-async-handler");

const DB = require("../models");
const { StatusCodes } = require("http-status-codes");
const { uploadMultipleFiles } = require("../utils/helpers");

const postComment = expressAsyncHandler(async (req, res, next) => {
  const files = req.files;

  console.log(req.files);
  const { postId, content } = req.fields;

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

      console.log(stringifyData);

      const comment = await DB.comment.create({
        fileUrl: stringifyData,
        content: content,
        postId: postId,
      });

      res.status(StatusCodes.OK).json({
        message: "comment succussful ",
        comment: comment?.content,
        files: JSON.parse(comment?.fileUrl),
      });
    } else {
      const comment = await DB.comment.create({
        content: content,
        postId: postId,
      });

      res.status(StatusCodes.OK).json({
        message: "comment succussful ",
        comment: comment.content,
      });
    }
  } catch (error) {
    next(error);
  }
});
module.exports = { postComment };
