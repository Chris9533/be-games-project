const db = require("../db/connection.js");

exports.fetchReview = (review_id) => {
    return db.query("SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id", [review_id])
    .then((results) => {
        
       const review = results.rows
      
       
      if(!review.length) {
          return Promise.reject({ status: 404, msg: "review not found"})
      } else {
          

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

exports.fetchReviews = () => {
    return db.query("SELECT reviews.review_id, reviews.title, reviews.owner, reviews.review_img_url, reviews.category, reviews.created_at, reviews.votes, COUNT(comments.review_id)::INT AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY created_at  DESC")
    .then((results) => {
        console.log(results.rows)

    const reviews = results.rows

    return reviews;

        

    })
    
}