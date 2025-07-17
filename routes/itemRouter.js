const { Router } = require("express");
const showItems = require("../controllers/itemController.js");

const itemRouter = Router();

itemRouter.get("/", showItems);

module.exports = itemRouter;