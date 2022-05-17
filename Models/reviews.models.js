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