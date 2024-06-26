const Pool = require('pg').Pool
require('dotenv').config();

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    database:process.env.DB
})

module.exports = pool;