const express = require('express');
const fileService = require('./files.service');
const bodyParser = require('body-parser');
const router = express();

module.exports = router;

router.post('/add-files/:username/:type', (req, res, next) => {
    fileService.uploadType(req.body, req.params.username, req.params.type)
        .then(() => res.json({}))
        .catch((err) => next(err));
});

router.get('/get-files/:username/:type', (req, res, next) => {
    fileService.getFiles(req.params.username, req.params.type)
        .then(file => file ? res.sendFile(file) : res.status(400).send("Files not found"))
        .catch(err => next(err));
});

router.use((err, req, res, next) => {
    res.status(500).send("Error message:" + (err.message ? err.message : ''));
});