const express = require('express');
const fileService = require('./files.service');
const bodyParser = require('body-parser');
const upload = require('multer');
express.use(bodyParser.urlencoded({extended: true}));
const router = express();

module.exports = router;

router.post('/add-files/:type', upload.single('myFile'), (req, res, next) => {
    fileService.uploadType(req.file, req.body.username, req.body.type)
        .then(() => res.json({}))
        .catch((err) => next(err));
});

router.get('/get-files/:type', (req, res, next) => {
    fileService.getFiles(req.body.username, req.params.type)
        .then(file => file ? res.sendFile(file) : res.status(400).send("Files not found"))
        .catch(err => next(err));
});

router.use((err, req, res, next) => {
    res.status(500).send("Error message:" + (err.message ? err.message : ''));
});