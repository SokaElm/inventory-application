const db = require("../db/queries");

async function showItems(req, res) {
  res.locals.items = await db.getAllItems();
  res.render("item", { items :  res.locals.items, links: res.locals.links });

}

module.exports = showItems;