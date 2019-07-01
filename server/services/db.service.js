const sql = require("mysql2");

const conn = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "birdmap",
});

module.exports = conn;
