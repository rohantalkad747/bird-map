const express = require("express");
const fileService = require("../services/files.service");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const router = express();

/**
 * Temporary storage for file uploads.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      crypto.randomBytes(16).toString("hex") + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

/* Middleware for determining whether user is logged in. */
const isAuthed = (req, res, next) => {
  if (req.cookies.user) next();
  else res.sendStatus(401);
};

router.post(
  "/add-files",
  [isAuthed, upload.single("file")],
  (req, res, next) => {
    if (!req.file) {
      res.status(400).send("File is undefined!");
      return;
    }
    fileService
      .uploadToBucket(req.cookies.user.id, req.file, req.params.type)
      .then(() => res.json({}))
      .catch(err => next(err));
  }
);

router.get("/get-files/", (req, res, next) => {
  fileService
    .getBucketFiles(res, req.body.fileType, req.body.userId)
    .then(file =>
      file ? res.sendFile(file) : res.status(400).send("Files not found")
    )
    .catch(err => next(err));
});

router.use((err, req, res, next) => {
  res.status(500).send("Error message:" + (err.message ? err.message : ""));
});

module.exports = router;
