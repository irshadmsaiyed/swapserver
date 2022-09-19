const { Pool } = require('pg');
require('dotenv').config();

// const connectionString =
//   'postgres://ufznnsbdefzjse:bbd15da7e48e35575ba596f103a84adda65341dcf4adc4d32f714398139ff882@ec2-52-71-69-66.compute-1.amazonaws.com:5432/d1a1mfvp3epk0s';

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });
const pool = new Pool({
  // connectionString,
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false },
});

module.exports = { query: (text, params) => pool.query(text, params) };
