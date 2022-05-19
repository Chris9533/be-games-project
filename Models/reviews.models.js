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

exports.fetchReviews = (sort_by = "created_at", order = "DESC", category) => {
    const validSortBy = ["review_id", "created_at", "votes", "comment_count"]
    const validOrder = ["ASC", "DESC"]
    const validCategory = ["euro game", "dexterity", "social deduction", "children's games"]
    
    let queryStr = "SELECT reviews.review_id, reviews.title, reviews.owner, reviews.review_img_url, reviews.category, reviews.created_at, reviews.votes, COUNT(comments.review_id)::INT AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id"

    queryVals = []

    if(validCategory.includes(category)) {
        queryStr += ` WHERE category = $1 GROUP BY reviews.review_id`
        queryVals.push(category)
    } else if (category) {
        return Promise.reject({ status: 404, msg: "not found"})
    } else {
        queryStr += " GROUP BY reviews.review_id"
    }
    if(validSortBy.includes(sort_by) && validOrder.includes(order)) {
    queryStr += ` ORDER BY ${sort_by}`
    queryStr += ` ${order}`
    } else {
        return Promise.reject({ status: 400, msg: "bad request"})
    }
    

    return db.query(queryStr, queryVals)
    .then((results) => {

    const reviews = results.rows

    return reviews;

        

    })
    
}

exports.fetchComments = (review_id) => {
   const doesReviewExist = db.query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
   const comments = db.query("SELECT * FROM comments WHERE review_id = $1", [review_id])
   
   return Promise.all([comments, doesReviewExist])
   .then(([comments, doesReviewExist]) => {

    if(!doesReviewExist.rows.length) {
        return Promise.reject({ status: 404, msg: "review not found"})
    } else {
        return comments.rows
    }
   })   
}

exports.insertComment = (review_id, username, body) => {
    return db.query("INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *", [review_id, username, body])
    .then((results) => {
        return results.rows[0];

    })
   
}