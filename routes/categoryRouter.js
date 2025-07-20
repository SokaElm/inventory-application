const { Router } = require("express");
const {
  showCategory,
  showItemsByCategory,
  showNewCategoryForm,
  postNewCategory,
} = require("../controllers/categoryController.js");

const categoryRouter = Router();

categoryRouter.get("/", showCategory);
categoryRouter.get("/create", showNewCategoryForm);
categoryRouter.post("/create", postNewCategory);
categoryRouter.get("/:categoryName", showItemsByCategory);

module.exports = categoryRouter;
