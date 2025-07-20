const db = require("../db/queries");

async function showItems(req, res) {
  res.locals.items = await db.getAllItems();
  res.render("item", {
    items: res.locals.items,
    links: res.locals.links,
    title: "All products",
  });
}

async function showNewItemForm(req, res) {
  const categories = await db.getAllCategories();

  res.render("addItem", {
    categories,
    links: res.locals.links,
    title: "Create an Item",
    item: {},
    itemCategory: "",
  });
}

async function postNewItem(req, res) {
  const title = req.body.title;
  const img = req.body.img;
  const brand = req.body.brand;
  const stock = Number(req.body.stock);
  const price = Number(req.body.price);
  const category = req.body.category;

  const categoryId = await db.getCategoryId(category);

  await db.insertNewItem(title, img, brand, stock, categoryId, price);

  res.render("index", {
    links: res.locals.links,
    title: "New item successfully added !",
  });
}

async function updateItemForm(req, res) {
  const itemId = req.params.id;
  const item = await db.getItemById(itemId);
  const itemCategory = await db.getCategoryName(item.category_id);

  const categories = await db.getAllCategories();

  res.render("addItem", {
    categories,
    links: res.locals.links,
    title: "Update an Item",
    item,
    itemCategory,
  });
}

async function postUpdateItem(req, res) {
  const title = req.body.title;
  const img = req.body.img;
  const brand = req.body.brand;
  const stock = Number(req.body.stock);
  const price = Number(req.body.price);
  const category = req.body.category;
  const itemId = req.params.id;

  const categoryId = await db.getCategoryId(category);

  await db.updateItem(title, img, brand, stock, categoryId, price, itemId);

  res.render("index", {
    links: res.locals.links,
    title: "Item has successfully been updated !",
  });
}

module.exports = {
  showItems,
  showNewItemForm,
  postNewItem,
  updateItemForm,
  postUpdateItem,
};
