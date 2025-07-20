const { Router } = require("express");
const {
  showItems,
  showNewItemForm,
  postNewItem,
  updateItemForm,
  postUpdateItem,
} = require("../controllers/itemController.js");

const itemRouter = Router();

itemRouter.get("/", showItems);
itemRouter.get("/create", showNewItemForm);
itemRouter.post("/create", postNewItem);
itemRouter.get("/:id/update", updateItemForm);
itemRouter.post("/:id/update", postUpdateItem);

module.exports = itemRouter;
