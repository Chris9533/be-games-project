const express = require("express");
const { returnCategories } = require("./Controllers/controllers.js")



const app = express();
app.use(express.json());


app.get("/api/categories", returnCategories)




app.use("/*", (req, res) => {
    res.status(404).send({ msg: "route not found" });
  });


app.use((err, req, res, next) => {
    res.status(500).send({msg: "internal server error"})
})


module.exports = app;