const { Pool } = require("pg");
require("dotenv").config();

const config = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const pool = new Pool(config);

pool.connect();

module.exports = pool;
