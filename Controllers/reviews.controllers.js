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

    fetchReview(review_id).then((review) => {
        let votes = review[0].votes
        let newVotes = votes += alterVotes
        
       return updateReview( newVotes, review_id)

    }).then((review) => {
        res.status(202).send({review})
        
    }).catch((err) => {
        console.log(err);
        next(err);
    })
}