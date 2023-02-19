const { Pool } = require("pg");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = new Pool({
  connectionString: `postgres://${DB_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_USER}`,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
