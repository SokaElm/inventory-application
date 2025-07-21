const { Pool } = require("pg");

const isProd = process.env.NODE_ENV === "production";

module.exports = new Pool({
  connectionString: process.env.CONNECTIONSTRING_PROD,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});
