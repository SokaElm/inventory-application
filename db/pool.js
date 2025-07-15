const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.CONNECTIONTOSTRING,
  ssl: false,
  
});