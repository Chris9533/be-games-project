const { fetchReview, updateReview } = require("../Models/reviews.models")

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