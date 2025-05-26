const mysql = require("mysql2");

const db = {
  host: "localhost",
  user: "root",
  password: "@1201Ujjwal",
  database: "placement_module",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 30000,
  rowsAsArray: false,
  enableKeepAlive: true,
  multipleStatements: true,
};

const pool = mysql.createPool(db);

pool.on("connection", (connection) => {
  console.log("New connection created in the pool");
});

pool.on("acquire", (connection) => {
  console.log("Connection %d acquired", connection.threadId);
});

pool.on("enqueue", () => {
  console.log("Waiting for available connection slot");
});

pool.on("release", (connection) => {
  console.log("Connection %d released", connection.threadId);
});

// Handle errors
pool.on("error", (err) => {
  console.error("MySQL Pool Error:", err);
  // You might want to handle errors more gracefully, such as attempting to reconnect.
});

console.log("Connected to the database");
module.exports = pool.promise(); // Exporting promise-based pool for Sequelize
