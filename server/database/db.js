require("dotenv").config({ path: ".env" });
const Pool = require("pg").Pool;
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

module.exports = pool;
