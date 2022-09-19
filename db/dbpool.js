// postgres
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = { query: (text, params) => pool.query(text, params) };

// mysql
const mysql = require('mysql2');
require('dotenv').config();

const dbPool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  connectionLimit: 10,
  waitForConnections: true,
});

module.exports = dbPool.promise();
