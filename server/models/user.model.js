const bcrypt = require("bcryptjs");

/**
 * Data access object for users.
 */
class UserModel {
  setEmail(email) {
    this.email = email;
    return this;
  }
  async setPassword(password) {
    this.evaluatePasswordStrength(password);
    const hashedPassword = await bcrypt.hashSync(password);
    this.password = hashedPassword;
    return this;
  }
  evaluatePasswordStrength(password) {
    if (password.length < 8) {
      throw Error("Password must be greater than 8!");
    }
    if (!/\d/.test(password)) {
      throw Error("Password must contain at least one number!");
    }
    return this;
  }
}

module.exports = UserModel;
