const sql = require("mysql2/promise");

/* Connection factory */
const getConn = async () => {
  return await sql.createConnection({
    host: "remotemysql.com",
    user: "FiGUGVwsXK",
    password: "hSaFCr26D9",
    database: "FiGUGVwsXK"
  });
};

module.exports = { getConn };
