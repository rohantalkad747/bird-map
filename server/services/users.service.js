/** =========================================================
 * Service for user CRUD operations.
 * @author Rohan
 * ==========================================================
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const config = require("../config.json");

module.exports = {
  authenticate,
  create,
  update,
  delete: _delete,
  getAll,
  getUserParams
};
const { conn } = require("./db.service");

/**
 * Authenticates a user based on their username and password. Returns a token iff
 * the authentication was successful. Otherwise, an error is returned.
 * @param email The user's e-mail address.
 * @param password
 * @param cb
 * @return {Promise<void>}
 */
async function authenticate(email, password, cb) {
  const user = await conn.query(`SELECT * FROM users WHERE username = ${username}`);
  bcrypt.compare(password, user.hashed, (err, res, cb) => {
    if (err) cb(err);
    const token = jwt.sign({ sub: res["id"] }, config.secret);
    cb(token);
  });
}
async function create(userParams) {
  const params = await getUserParams(userParams);
  if (emailExists(userParams.email)) {
    throw "Email already in use";
  }
  conn.connect(err => {
    if (err) throw err;
    const pass = bcrypt.hashSync(defPass, 10);
    const created = new Date().toDateString();
    const vals =
      `INSERT INTO users (first, last, email, username, hashed, created)` +
      ` VALUES (${params[0]}, ${params[1]}, ${params[2]}, ${params[3]}, ${
        params[4]
      }, ${created})`;
    conn.query(vals, (err, res) => {
      if (err) throw err;
      console.log("One user was added.");
    });
  });
}

async function update(userParams, token) {
  if (!userExists) {
    throw "User does not exist!";
  }
  const params = await getUserParams(userParams);
  conn.connect(err => {
    if (err) throw err;
    let pass;
    if (defPass) {
      pass = bcrypt.hashSync(userParams.password, 10);
    } else {
      conn.query(
        `SELECT hashed FROM users WHERE username = ${params[0]}`,
        (err, res) => {
          if (err) throw err;
          pass = res;
        }
      );
    }
    const vals = `UPDATE users SET first=${params[0]} last=${
      params[1]
    } email = ${params[2]} username = ${params[3]}
     hashed = ${pass}
        WHERE id = ${userParams["id"]}`;
    conn.query(vals, (err, res) => {
      if (err) throw err;
      console.log("One user was added.");
    });
  });
}

async function userExists(username) {
  const stat = `SELECT COUNT(*) FROM users WHERE username = ${username}`;
  conn.connect(err => {
    if (err) throw err;
    conn.query(
      stat,
      (err, res => {
        if (err) throw err;
        return res != 0;
      })
    );
  });
}

async function emailExists(email) {
  const stat = `SELECT COUNT(*) FROM users WHERE email = ${email}`;
  conn.connect(err => {
    if (err) throw err;
    conn.query(stat, (err, res) => {
      return res != 0;
    });
  });
}

async function getAll() {
  conn.connect(err => {
    if (err) throw err;
    conn.query("SELECT * from USERS LIMIT 1000");
  });
}

async function getUser(token) {
  conn.connect(err => {
    if (err) throw err;
    jwt.verify(token, "shhh", (err, dec) => {
      if (err) throw err;
      const username = token.payload.username;
      const stat = `SELECT * FROM users WHERE username = ${username}`;
      conn.query(stat, (err, res) => {
        if (err) throw err;
        return res;
      });
    });
  });
}

async function getUserParams(userParams) {
  const first = userParams["first"];
  const last = userParams["last"];
  const email = userParams["email"];
  const username = userParams["username"];
  // User-defined password to be hashed by the BCrypt hashing algorithm
  const defPass = userParams["password"];
  return [first, last, email, username, defPass];
}

async function _delete(userParams) {
  const { username } = userParams;
  conn.connect(err => {
    if (err) throw err;
    conn.query(`DELETE FROM users WHERE username = ${username}`, (err, res) => {
      if (err) throw err;
    });
  });
}
