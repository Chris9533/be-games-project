const express = require("express");
const apiRouter = require('./routes/api-router');
const cors = require('cors')




const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

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