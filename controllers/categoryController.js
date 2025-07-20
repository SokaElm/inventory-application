const db = require("../db/queries");

async function showCategory(req, res) {
  const categories = await db.getAllCategories();
  res.render("category", { categories, links: res.locals.links });
}

async function showItemsByCategory(req, res) {
  const category = req.params.categoryName;

  res.locals.items = await db.getItemsByCategory(category);

  if (res.locals.items.length === 0) {
    return res.render("index", {
      links: res.locals.links,
      title: "This category is empty !",
    });
  }

  res.render("item", {
    items: res.locals.items,
    links: res.locals.links,
    title: category,
  });
}

async function showNewCategoryForm(req, res) {
  res.render("addCategory", {
    links: res.locals.links,
    title: "Create a Category",
    category: "",
    categoryId: "",
  });
}

async function postNewCategory(req, res) {
  const category = req.body.category;

  await db.insertNewCategory(category);

  res.render("index", {
    links: res.locals.links,
    title: "New category successfully added !",
  });
}

async function updateCategoryForm(req, res) {
  const categoryId = req.params.id;
  const category = await db.getCategoryName(categoryId);

  res.render("addCategory", {
    links: res.locals.links,
    title: "Update a Category",
    category,
    categoryId,
  });
}

async function postUpdateCategory(req, res) {
  const categoryId = req.params.id;
  const category = req.body.category;

  await db.updateCategory(category, categoryId);

  res.render("index", {
    links: res.locals.links,
    title: "Category has successfully been updated !",
  });
}

async function deleteCategory(req, res) {
  const categoryId = req.params.id;

  await db.deleteCategory(categoryId);

  res.render("index", {
    links: res.locals.links,
    title: "Category has successfully been deleted !",
  });
}

module.exports = {
  showCategory,
  showItemsByCategory,
  showNewCategoryForm,
  postNewCategory,
  updateCategoryForm,
  postUpdateCategory,
  deleteCategory,
};
