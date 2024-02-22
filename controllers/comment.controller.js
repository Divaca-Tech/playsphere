const expressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const { StatusCodes } = require("http-status-codes");
const { uploadMultipleFiles, throwError } = require("../utils/helpers");
const { validationResult } = require("express-validator");
validationResult;
const postComment = expressAsyncHandler(async (req, res, next) => {
  const { authId } = req;
  const files = req.files;

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

      const comment = await DB.comment.create({
        fileUrl: stringifyData,
        content: content,
        postId: postId,
        userId: authId,
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
        userId: authId,
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

const deleteComment = expressAsyncHandler(async (req, res, next) => {
  try {
    const { authId } = req;

    const { commentId } = req.params;

    const exactComment = await await DB.comment.findOne({
      where: {
        id: commentId,
      },
      include: DB.post,
    });

    if (
      exactComment?.userId !== authId ||
      exactComment?.post?.userId !== authId
    ) {
      throwError("Unauthorized access", StatusCodes.UNAUTHORIZED, true);
    }

    const comment = await DB.comment.destroy({
      where: {
        id: commentId,
      },
    });

    if (comment) {
      res.status(StatusCodes.OK).json({
        message: "Comment deleted successfully",
        status: StatusCodes.OK,
      });
    }
  } catch (error) {
    next(error);
  }
});
const updateCommentText = expressAsyncHandler(async (req, res, next) => {
  try {
    const { authId } = req;
    const { commentId, content } = req.body;
    const exactComment = await await DB.comment.findOne({
      where: {
        id: commentId,
      },
      include: DB.post,
    });
    if (exactComment.userId !== authId) {
      throwError("Unauthorized access", StatusCodes.UNAUTHORIZED, true);
    }

    const comment = await DB.comment.update(
      {
        content,
      },
      {
        where: {
          id: commentId,
        },
      }
    );

    if (comment) {
      res.status(StatusCodes.OK).json({
        message: " Comment updated successfully",
        status: StatusCodes.OK,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { postComment, deleteComment, updateCommentText };
