const express = require("express");
const router = express();
const userService = require("../services/user.service");

router.post("/authenticate", (req, res, next) => {
  userService
    .authenticate(req.body.email, req.body.password)
    .then(user => {
      if (user) {
        console.log(user)
        res.status(200).send(user);
      }
    })
    .catch(err => res.status(401).send(err.message));
});

router.post("/register", (req, res, next) => {
  console.log(req.body);
  userService
    .create(req.body.email, req.body.password)
    .then(() => res.json({}))
    .catch(err => res.status(400).send(err.message));
});

router.post("/decode", (req, res, next) => {
  userService.decodeJwt(req.body.token, (err, tok) => {
    if (err) res.sendStatus(401);
    else {
      res.status(200).send(tok);
    }
  })
});

module.exports = router;

