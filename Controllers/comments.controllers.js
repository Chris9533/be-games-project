const { deleteComment } = require("../Models/comments.models")


exports.removeComment = (req, res, next) => {
    const { comment_id } = req.params
    deleteComment(comment_id).then((result) => {
        res.status(204).send(result)
    })
    .catch((err) => {
        next(err);

    })
}