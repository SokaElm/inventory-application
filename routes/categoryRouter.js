const { Router } = require("express");
const showCategory = require("../controllers/categoryController.js");

const categoryRouter = Router();

categoryRouter.get("/", showCategory);

module.exports = categoryRouter;