const router = require('express')();
const userService = require('./users.service');

module.exports = router;

router.post('/authenticate', (req, res, next) => {
    userService.authenticate(req.body.username, req.body.password)
        .then(user => {user ? res.json(user) : res.status(400).send("Username/password is incorrect.")})
        .catch(err => next(err))});

router.post('/register', (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.put('/update', (req, res, next) => {
    userService.update(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.delete('/delete', (req, res, next) => {
    userService.delete(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.get('/all', (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
});

router.use((err, req, res, next) => {
    res.status(500).send("An error occured.");
});