const { fetchCategories } = require("../Models/models.js")

exports.returnCategories = (req, res) => {
   fetchCategories().then((categories) => {
       res.status(200).send({ categories });

   })

}