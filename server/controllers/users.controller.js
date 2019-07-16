const express = require("express");
const router = express();
const userService = require("../services/user.service");

module.exports = router;

router.post("/authenticate", (req, res, next) => {
  userService
    .authenticate(req.body.email, req.body.password)
    .then(token => {
      token
        ? res.cookie("token", token).redirect("/home")
        : res.status(400).send("Username/password is incorrect.");
    })
    .catch(err => next(err));
});

router.post("/register", (req, res, next) => {
  console.log("ada");
  userService
    .create(req.body.email, req.body.password)
    .then(() => res.json({}))
    .catch(err => next(err));
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("An error occured.");
});
