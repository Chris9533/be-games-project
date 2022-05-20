const { deleteComment, updateComment } = require("../Models/comments.models")


exports.removeComment = (req, res, next) => {
    const { comment_id } = req.params
    deleteComment(comment_id).then((result) => {
        res.status(204).send(result)
    })
    .catch((err) => {
        next(err);

    })
}

exports.patchComment = (req, res, next) => {
    const { inc_votes } = req.body
    const { comment_id } = req.params 

  
    updateComment(inc_votes, comment_id).then((comment) => {
        res.status(200).send({ comment })

    })
    .catch((err) => {
        next(err);

    })
}