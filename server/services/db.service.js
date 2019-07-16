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

/* Helper to parse MySQL raw data */
const convertJSON = obj => JSON.parse(JSON.stringify(obj));

module.exports = { getConn, convertJSON };
