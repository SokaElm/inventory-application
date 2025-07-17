const db = require("../db/queries");

async function showCategory(req, res) {
  const categories = await db.getAllCategories();
  res.render("category", { categories, links: res.locals.links });
}

async function showItemsByCategory(req, res) {
  const category = req.params.categoryName;
  res.locals.items = await db.getItemsByCategory(category);
  res.render("item", {
    items: res.locals.items,
    links: res.locals.links,
    title: category,
  });
}

module.exports = { showCategory, showItemsByCategory };
