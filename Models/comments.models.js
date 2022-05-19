const db = require("../db/connection.js");

exports.deleteComment = (comment_id) => {
    const doesCommentExist = db.query("SELECT * FROM comments WHERE comment_id = $1", [comment_id])
    const deleteComment = db.query("DELETE FROM comments WHERE comment_id = $1", [comment_id])
    
 return Promise.all([doesCommentExist, deleteComment])
 .then(([doesCommentExist]) => {

    if(!doesCommentExist.rows.length) {
        return Promise.reject({ status: 404, msg: "comment not found"})
    } else {
        return {};
    }

 })
}