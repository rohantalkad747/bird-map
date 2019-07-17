const sql = require("mysql2/promise");

/* Connection factory */
const getConn = async () => {
  return await sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "birdmap"
  });
};

module.exports = { getConn };
