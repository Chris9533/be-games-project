const apiRouter = require('express').Router();
const endPoints = require("../endpoints.json")
const categoriesRouter = require("./categories-router")
const commentsRouter = require("./comments-router")
const usersRouter = require("./users-router")
const reviewsRouter = require("./reviews-router")


apiRouter.get("/", (req, res) => {
    res.status(200).send(endPoints)
    });

    apiRouter.use('/categories', categoriesRouter);

    apiRouter.use("/comments", commentsRouter)

    apiRouter.use("/users", usersRouter)

    apiRouter.use("/reviews", reviewsRouter)

    module.exports = apiRouter;
