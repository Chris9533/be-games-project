const express = require("express");
const { returnCategories } = require("./Controllers/categories.controllers")
const { returnReview, patchReview, returnReviews, returnComments, postComment } = require("./Controllers/reviews.controllers");
const { returnUsers } = require("./Controllers/users.controllers");




const app = express();
app.use(express.json());


app.get("/api/categories", returnCategories);
app.get("/api/reviews", returnReviews)
app.get("/api/reviews/:review_id", returnReview)
app.get("/api/reviews/:review_id/comments", returnComments)
app.get("/api/users", returnUsers)

app.post("/api/reviews/:review_id/comments", postComment)

app.patch("/api/reviews/:review_id", patchReview)





app.use("/*", (req, res) => {
    res.status(404).send({ msg: "route not found" });
  });

  app.use((err, req, res, next) => {
      if(err.code === "22P02") {
          res.status(400).send({ msg: "bad request"})
      } else if (err.code === '23502' ) {
        res.status(400).send({ msg: "bad request"})
      } else if (err.code === '23503'){
        res.status(404).send({ msg: "not found"})

      } else {
        next(err);

      }
  })

  app.use((err, req, res, next) => {
      res.status(err.status).send({ msg: err.msg })
  })


app.use((err, req, res, next) => {
    res.status(500).send({msg: "internal server error"})
})


module.exports = app;