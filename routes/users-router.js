const usersRouter = require('express').Router();
const { returnUsers, returnUser } = require("../Controllers/users.controllers");

usersRouter.get("/", returnUsers)

usersRouter.get("/:username", returnUser)

module.exports = usersRouter