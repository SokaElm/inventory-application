const { Router } = require("express");
const {
  showCategory,
  showItemsByCategory,
  showNewCategoryForm,
  postNewCategory,
  updateCategoryForm,
  postUpdateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");

const categoryRouter = Router();

categoryRouter.get("/", showCategory);
categoryRouter.get("/create", showNewCategoryForm);
categoryRouter.post("/create", postNewCategory);
categoryRouter.get("/:categoryName", showItemsByCategory);
categoryRouter.get("/:id/update", updateCategoryForm);
categoryRouter.post("/:id/update", postUpdateCategory);
categoryRouter.get("/:id/delete", deleteCategory);

module.exports = categoryRouter;
