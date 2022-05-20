const reviewsRouter = require('express').Router();
const { returnReview, patchReview, returnReviews, returnComments, postComment } = require("../Controllers/reviews.controllers");

reviewsRouter.get("/", returnReviews)
reviewsRouter.get("/:review_id", returnReview)
reviewsRouter.get("/:review_id/comments", returnComments)


reviewsRouter.post("/:review_id/comments", postComment)

reviewsRouter.patch("/:review_id", patchReview)


module.exports = reviewsRouter;
