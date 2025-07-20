const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query(`
    SELECT 
      items.id,
      items.title,
      items.stock,
      items.brand,
      items.img,
      items.price,
      categories.category AS category
    FROM items
    JOIN categories ON items.category_id = categories.id;
  `);

  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT DISTINCT category FROM categories");
  return rows;
}

async function getItemsByCategory(category) {
  const { rows } = await pool.query(
    "SELECT items.id,items.title,items.stock,items.brand,items.img,items.price,categories.category AS category FROM items JOIN categories ON items.category_id = categories.id WHERE categories.category = $1;",
    [category]
  );
  return rows;
}

async function getCategoryId(category) {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE category=$1",
    [category]
  );
  return rows[0].id;
}

async function insertNewItem(title, img, brand, stock, categoryId, price) {
  await pool.query(
    "INSERT INTO items (title, category_id, stock, brand, img, price) VALUES ($1,$2,$3,$4,$5,$6)",
    [title, categoryId, stock, brand, img, price]
  );
}

async function updateItem(title, img, brand, stock, categoryId, price, itemId) {
  await pool.query(
    "UPDATE items SET title = $1, category_id =$2, stock =$3, brand = $4, img=$5, price =$6 WHERE items.id=$7",
    [title, categoryId, stock, brand, img, price, itemId]
  );
}

async function insertNewCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function getItemById(itemId) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1;", [
    itemId,
  ]);
  return rows[0];
}

async function getCategoryName(categoryId) {
  const { rows } = await pool.query(
    "SELECT category FROM categories WHERE id=$1",
    [categoryId]
  );
  return rows[0].category;
}

module.exports = {
  getAllItems,
  getAllCategories,
  getItemsByCategory,
  getCategoryId,
  insertNewItem,
  insertNewCategory,
  getItemById,
  getCategoryName,
  updateItem,
};
