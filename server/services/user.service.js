/** =========================================================
 * Service functions for registering, authenticating, and deleting users.
 * @author Rohan
 * ==========================================================
 */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const { getConn } = require("./db.service");
const { convertJSON } = require("../util/util");

/**
 * Authenticates a user based on their email and password. Returns a token if
 * the authentication was successful. Otherwise, an error is thrown.
 * @param {string} email The user's e-mail address.
 * @param {string} password The user's password.
 * @param {function} cb The callback function.
 * @return {Promise<void>}
 */
async function authenticate(email, password, cb) {
  const user = convertJSON(await this.getUser(email));
  if (!user) throw Error("No   with that e-mail exists!");
  const passwordCorrect = bcrypt.compareSync(password, user.hashedpw);
  if (passwordCorrect) {
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
    return token;
  } else throw Error("Invalid credentials!");
}

/**
 * Decodes a JWT token string and returns the value.
 * @param {string} token
 * @param {function} cb
 */
function decodeJwt(token, cb) {
  jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
    if (err) cb(err, null);
    cb(null,res);
  });
}

/**
 * Creates a user based on the given email and password.
 * @param {string} email The email of the user.
 * @param {string} password The password of the user.
 */
async function create(email, password) {
  if (!email || !password) throw Error("One or more fields are undefined!");
  const isUser = await this.getUser(email);
  if (isUser) {
    throw Error("Account with this e-mail already exists!");
  }
  const user = new UserModel();
  user.setEmail(email);
  await user.setPassword(password);
  const conn = await getConn();
  const stat = `INSERT INTO users (email, hashedpw) VALUES ('${user.email}', '${user.password}')`;
  await conn.end();
}

/**
 * Returns the user associated with the given email.
 * @param {string} email The user's email.
 */
async function getUser(email) {
  const stat = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;
  const conn = await getConn();
  const userQuery = await conn.execute(stat);
  await conn.end();
  // MySQL returns a weird object ... so just get the first result.
  const userObj = userQuery[0][0];
  return userObj ? convertJSON(userObj) : userObj;
}

module.exports = {
  authenticate,
  create,
  getUser,
  decodeJwt
};
