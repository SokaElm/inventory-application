const { Router } = require("express");
const showHome = require("../controllers/indexController.js");

const indexRouter = Router();

indexRouter.get("/", showHome);

module.exports = indexRouter;