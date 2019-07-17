const express = require("express");
const router = express();
const geoService = require("../services/geospatials.service");

router.post("/add-coordinate", (req, res, next) => {
  geoService
    .createBirdCoordinate(req.body.birds)
    .then(() => res.status(200).send("Successfully added bird coordinates"))
    .catch(err => res.status(500).send("Failed to add coordinates"));
});

router.get("/all-coordinates", (req, res, next) => {
  geoService
    .getAllBirdCoordinates(req.body.birdIds)
    .then(birds => {
      res.send(birds);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Failed to get birds");
    });
});

router.get("/all-birds", (req, res, next) => {
  geoService
    .getAllBirds()
    .then(birds => {
      res.send(birds);
    })
    .catch(err => {
      res.status(500).send("Failed to get birds");
    });
});

module.exports = router;
