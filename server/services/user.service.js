/** =========================================================
 * Service functions for registering, authenticating, and deleting users.
 * @author Rohan
 * ==========================================================
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const { conn } = require("./db.service");

/**
 * Authenticates a user based on their email and password. Returns a token if
 * the authentication was successful. Otherwise, an error is thrown.
 * @param email The user's e-mail address.
 * @param password The user's password.
 * @param cb The callback function.
 * @return {Promise<void>}
 */
async function authenticate(email, password, cb) {
  const user = getUser(email);
  if (!user) throw Error("No user with that e-mail exists!");
  if (await bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user }, process.env.JWT_SECRET);
    const { hash, ...userWithoutHashed } = user;
    userWithoutHashed.token = token;
  } else throw Error("Invalid credentials!");
}

/**
 * Creates a user based on the given email and password.
 * @param email The email of the user.
 * @param password The password of the user.
 */
async function create(email, password) {
  if (!email || !password) throw Error("One or more fields are undefined!");
  if (this.getUser(email)) {
    throw Error("Account with this e-mail already exists!");
  }
  const user = await new UserModel.Builder()
    .withEmail(email)
    .withPassword(password)
    .build();
  const stat = `INSERT INTO users (email, hash) VALUES (${user.email}, ${user.password})`;
  await conn.execute(stat);
}

/**
 * Returns the user associated with the given email.
 * @param email The user's email.
 */
async function getUser(email) {
  const stat = `SELECT * FROM users WHERE email = ${email}`;
  const user = await conn.execute(stat);
  return user;
}

/**
 * Deletes a user based on their userId.
 * @param userId The user's id.
 */
async function _delete(userId) {
  const stat = `DELETE FROM users WHERE id = ${userId}`;
  await conn.execute(stat);
}

module.exports = {
  authenticate,
  create,
  getUser,
  delete: _delete
};
