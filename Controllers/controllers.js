const { fetchCategories, fetchReview } = require("../Models/models.js")

exports.returnCategories = (req, res) => {
   fetchCategories().then((categories) => {
       res.status(200).send({ categories });

   })

}

exports.returnReview = (req, res, next) => {
    const review_id = req.params.review_id
    
fetchReview(review_id).then((review) => {
res.status(200).send({ review })
}).catch((err) => {
    
next(err)
})
}
