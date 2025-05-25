const { Pool } = require("pg");
require("dotenv").config();

const db = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(db);

pool.on("connect", (client) => {
  console.log("New connection created in the pool");
});

pool.on("acquire", (client) => {
  console.log("Connection %d acquired", client.processID);
});

pool.on("remove", (client) => {
  console.log("Connection %d removed", client.processID);
});

pool.on("error", (err, client) => {
  console.error("PostgreSQL Pool Error:", err);
});

console.log("Connected to PostgreSQL database");

module.exports = pool;
