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
 * @param email The user's e-mail address.
 * @param password The user's password.
 * @param cb The callback function.
 * @return {Promise<void>}
 */
async function authenticate(email, password, cb) {
  const user = convertJSON(await this.getUser(email));
  if (!user) throw Error("No   with that e-mail exists!");
  if (await bcrypt.compareSync(password, user.hashedpw)) {
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
    return token;
  } else throw Error("Invalid credentials!");
}

/**
 * Creates a user based on the given email and password.
 * @param email The email of the user.
 * @param password The password of the user.
 */
async function create(email, password) {
  if (!email || !password) throw Error("One or more fields are undefined!");
  const isUser = await this.getUser(email);
  if (isUser) {
    throw Error("Account with this e-mail already exists!");
  }
  const user = new UserModel();
  user.setEmail(email);
  // Password to hash
  await user.setPassword(password);
  console.log(user);
  const conn = await getConn();
  const stat = `INSERT INTO users (email, hashedpw) VALUES ('${user.email}', '${user.password}')`;
  console.log(await conn.execute(stat));
  await conn.end();
}

/**
 * Returns the user associated with the given email.
 * @param email The user's email.
 */
async function getUser(email) {
  const stat = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;
  const conn = await getConn();
  console.log(stat);
  const user = await conn.execute(stat);
  await conn.end();
  // MySQL returns a weird object ... so just get the first result.
  return convertJSON(user[0][0]);
}

module.exports = {
  authenticate,
  create,
  getUser
};
