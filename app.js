require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
// const customNotFoundError = require("./errors/customNotFoundError");
const db = require("./db/queries");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/indexRouter.js");
const itemRouter = require("./routes/itemRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const links = [
  { href: "/", text: "Home" },
  { href: "/item", text: "Items" },
  { href: "/category", text: "Categories" },
];

app.use(async (req, res, next) => {
  res.locals.links = links;
  next();
});

app.use("/", indexRouter);
app.use("/item", itemRouter);
app.use("/category", categoryRouter);

// app.use((req, res, next) => {
//   next(new customNotFoundError("Page not found"));
// });

// app.use((err, req, res, next) => {
//   const status = err.statusCode || 500;
//   const message = err.message || "Internal server error";

//   console.error(`[${status}] ${err.name}: ${message}`);

//   res.status(status).render("error", { message, status });
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
