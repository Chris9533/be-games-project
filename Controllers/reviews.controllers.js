const { fetchReview, updateReview, fetchReviews, fetchComments, insertComment } = require("../Models/reviews.models")

exports.returnReview = (req, res, next) => {
    const review_id = req.params.review_id
    
fetchReview(review_id).then((review) => {
res.status(200).send({ review })
}).catch((err) => {
next(err)
})
}

exports.patchReview = (req, res, next) => {
    const review_id = req.params.review_id
    let alterVotes = req.body.inc_votes 
    

    updateReview( review_id, alterVotes)

    .then((review) => {
        res.status(200).send({review})
        
    }).catch((err) => {
        
        next(err);
    })
}

exports.returnReviews = (req, res, next) => {
    fetchReviews().then((reviews) => {
        
        res.status(200).send({reviews})

    }).catch((err) => {
        next(err)
    })
}

exports.returnComments = (req, res, next) => {
    const {review_id} = req.params
    
    fetchComments(review_id).then((comments) => {
        res.status(200).send({comments})

    })
    .catch((err) => {
next(err)
    })
}

exports.postComment = (req, res, next) => {
    const { username, body } = req.body
    const { review_id } = req.params
    
    insertComment(review_id, username, body)
    .then((comment) => {
        res.status(201).send({comment})

    })
    .catch((err) => {
        next(err)
    })
}