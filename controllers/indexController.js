const db = require("../db/queries");

async function showHome(req, res) {
  res.render("index", {
    links: res.locals.links,
    title: "Welcome to the mock inventory !",
  });
}

module.exports = showHome;
