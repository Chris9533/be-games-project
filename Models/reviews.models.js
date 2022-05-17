const db = require("../db/connection.js");

exports.fetchReview = (review_id) => {
    const review = db.query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    const users = db.query("SELECT * FROM comments WHERE review_id = $1", [review_id])
    return Promise.all([review, users])
    .then(([reviewData, userData]) => {
      const commentCount = userData.rows.length
      const review = reviewData.rows
       
      if(!review.length) {
          return Promise.reject({ status: 404, msg: "review not found"})
      } else {
          review[0].comment_count = commentCount

          return review[0];
      }

    })
}

exports.updateReview = (review_id, alterVotes) => {
    return db.query("UPDATE reviews SET votes = reviews.votes + $1 WHERE review_id = $2 RETURNING *", [alterVotes, review_id] )
    .then((result) => {
        const review = result.rows
        if(!review.length) {
            return Promise.reject({ status: 404, msg: "review not found"})
        } else {
         return review[0];
        }
    })
}