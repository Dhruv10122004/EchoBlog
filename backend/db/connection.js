const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render-hosted PostgreSQL
  },
});

async function check() {
  try {
    await client.connect();
    console.log("Connected to remote PostgreSQL database");
  } catch (err) {
    console.error("Failed to connect to DB:", err);
  }
}

check();

module.exports = client;