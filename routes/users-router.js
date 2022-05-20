const usersRouter = require('express').Router();
const { returnUsers } = require("../Controllers/users.controllers");

usersRouter.get("/", returnUsers)

module.exports = usersRouter