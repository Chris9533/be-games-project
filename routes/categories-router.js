const categoriesRouter = require('express').Router();
const { returnCategories } = require("../Controllers/categories.controllers");



categoriesRouter.get("/", returnCategories);


module.exports = categoriesRouter