const express = require("express")
const router = express()
const geoService = require("./geospatials.service")

router.post("/add-coordinates", (req, res, next) => {
  geoService
    .create(req.next)
    .then(success =>
      success
        ? res.status(200).send("Successfully added bird coordinates")
        : res.status(400).send("Invalid parameters"),
    )
    .catch(err => res.status(500).send("Failed to add coordinates"))
})

router.get("/all-coordinates", (req, res, next) => {
  geoService
    .getAll(req.body.birdIds)
    .then(birds => {
      res.send(JSON.stringify(birds))
    })
    .catch(err => {
      console.log(err)
      res.status(500).send("Failed to get birds")
    })
})

module.exports = router