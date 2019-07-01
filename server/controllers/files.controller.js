const express = require("express");
const fileService = require("../services/files.service");
const bodyParser = require("body-parser");
const multer = require("multer");
const router = express();

module.exports = router;

const multerMemory = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/add-files/:username/:type",
  multerMemory.upload.single("file"),
  (req, res, next) => {
    fileService
      .uploadType(req.file, req.params.username, req.params.type)
      .then(() => res.json({}))
      .catch(err => next(err))
  },
);

router.get("/get-files/:username/:type", (req, res, next) => {
  fileService
    .getFiles(req.params.username, req.params.type)
    .then(file =>
      file ? res.sendFile(file) : res.status(400).send("Files not found"),
    )
    .catch(err => next(err))
});

router.use((err, req, res, next) => {
  res.status(500).send("Error message:" + (err.message ? err.message : ""))
});
