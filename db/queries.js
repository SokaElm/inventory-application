const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function getItemsByCategory(category) {
  const { rows } = await pool.query("SELECT * FROM items WHERE category = $1", [category]);
  return rows;
}

module.exports = {
  getAllItems,
  getItemsByCategory,
};