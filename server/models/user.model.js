const bcrypt = require("bcrypt");

/**
 * Data access object for users.
 */
class UserModel {
  constructor(userParams) {
    const { email, password } = userParams;
    this.email = email;
    this.password = password;
  }
  static get Builder() {
    class Builder {
      withEmail(email) {
        this.email = email;
        return this;
      }
      async withPassword(password) {
        this.evaluatePasswordStrength(password);
        const hashedPassword = await bcrypt.hashSync(password);
        this.password = hashedPassword;
        return this;
      }
      evaluatePasswordStrength(password) {
        if (password.length < 8)
          throw Error("Password must be greater than 8!");
        if (!/\d/.test(password))
          throw Error("Password must contain at least one number!");
      }
      build() {
        return new UserModel(this);
      }
    }
    return Builder;
  }
}

module.exports = UserModel;
