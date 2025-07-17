const { Router } = require("express");
const {
  showCategory,
  showItemsByCategory,
} = require("../controllers/categoryController.js");

const categoryRouter = Router();

categoryRouter.get("/", showCategory);
categoryRouter.get("/:categoryName", showItemsByCategory);

module.exports = categoryRouter;
