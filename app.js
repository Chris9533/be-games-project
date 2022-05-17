const express = require("express");
const { returnCategories } = require("./Controllers/categories.controllers")
const { returnReview } = require("./Controllers/reviews.controllers")



const app = express();
app.use(express.json());


app.get("/api/categories", returnCategories);
app.get("/api/reviews/:review_id", returnReview)




app.use("/*", (req, res) => {
    res.status(404).send({ msg: "route not found" });
  });

  app.use((err, req, res, next) => {
      if(err.code === "22P02") {
          res.status(400).send({ msg: "bad request"})
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