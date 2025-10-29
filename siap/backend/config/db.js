const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'siap_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get connection from pool
const db = pool.promise();

module.exports = db;