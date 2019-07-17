const express = require("express");
const router = express();
const userService = require("../services/user.service");

module.exports = router;

router.post("/authenticate", (req, res, next) => {
  userService
    .authenticate(req.body.email, req.body.password)
    .then(user => {
      if (user) {
        res.locals.user = user;
        req.session.user = user;
        res.redirect("/home");
      }
    })
    .catch(err => res.status(401).send(err.message));
});

router.post("/register", (req, res, next) => {
  console.log("ada");
  userService
    .create(req.body.email, req.body.password)
    .then(() => res.json({}))
    .catch(err => next(err));
});

router.post("/logout", (req, res, next) => {
  if (req.session && req.session.user) {
    req.session.reset();
    res.redirect("/");
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("An error occured.");
});
