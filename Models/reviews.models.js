const db = require("../db/connection.js");

exports.fetchReview = (review_id) => {
    return db.query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then((result) => {
      const review = result.rows
       
      if(!review.length) {
          return Promise.reject({ status: 404, msg: "review not found"})
      } else {
       return review;
      }

    })
}

exports.updateReview = (newVotes, review_id) => {
    return db.query("UPDATE reviews SET votes = $1 WHERE review_id = $2 RETURNING *", [newVotes, review_id] )
    .then((result) => {
        const review = result.rows
        return review

    })
}