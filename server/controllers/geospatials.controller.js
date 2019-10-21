const express = require("express");
const router = express();
const geoService = require("../services/geospatials.service");

router.post("/add-coordinate", (req, res, next) => {
  geoService
    .createBirdCoordinate(req.body.bird)
    .then(() => res.status(200).send("Successfully added bird coordinates"))
    .catch(err => {res.status(400).send(err.message)});
});

router.post("/all-coordinates", (req, res, next) => {
  geoService
    .getAllBirdCoordinates(req.body.birdIds, req.body.dateRange)
    .then(birds => {
      res.send(birds);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Failed to get birds");
    });
});

router.post("/graph-birds", (req, res, next) => {
  geoService.getNumberOfBirds(req.body.birdId, req.body.options)
    .then((birds) => res.send(birds))
    .catch((e) => res.status(400).send(e.message));
})

router.get("/all-birds", (req, res, next) => {
  geoService
    .getAllBirds()
    .then(birds => {
      res.send(birds);
    })
    .catch(err => {
      res.status(400).send("Failed to get birds");
    });
});

module.exports = router;
