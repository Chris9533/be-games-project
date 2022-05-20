const commentsRouter = require('express').Router();
const { removeComment } = require("../Controllers/comments.controllers");

commentsRouter.delete("/:comment_id", removeComment);

module.exports = commentsRouter
