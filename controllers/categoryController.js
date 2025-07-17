const db = require("../db/queries");

async function showCategory(req, res) {
  const items = await db.getAllItems();
  res.render("category", { items, links: res.locals.links });
}

module.exports = showCategory;