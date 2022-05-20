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

exports.updateComment = (inc_votes, comment_id) => {
    return db.query("UPDATE comments SET votes = comments.votes + $1 WHERE comment_id = $2 RETURNING *", [inc_votes, comment_id])
    .then((results) => {
        
        if(!results.rows.length) {
            return Promise.reject({ status: 404, msg: "comment not found"})
        } else {
        return results.rows[0];
        }

    })
}