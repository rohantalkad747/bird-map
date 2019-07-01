const sql = require("mysql")
const GeoJSONModel = require("../models/geojson.model")
const conn = require("./db.service")

module.exports = {
  create,
  getAll,
}

/**
 * Creates a geospatial entry for the given bird in the database.
 * @param geoJSON
 */
async function create(geoJSON) {
  const geospatial = new GeoJSONModel.Builder()
    .withLat(geoJSON.lat)
    .withLng(geoJSON.lng)
    .withBirdId(geoJSON.birdId)
    .withNumb(geoJSON.numb)
    .withDateTaken(geoJSON.dateTaken)
    .build()
  const { birdId, numb, descr, dateTaken, lat, lng } = geospatial
  conn.connect(err => {
    if (err) throw err
    const stat =
      `INSERT INTO geospatials (user_id, bird_id, numb, descr, date_taken, lat, lng)` +
      ` VALUES (${birdId}, ${numb}, ${descr}, ${dateTaken}, ${lat}, ${lng})`
    conn.query(stat, (err, res) => {
      if (err) return err
      return res
    })
  })
}

/**
 * Returns all the coordinates with the given birdIds.
 */
function getAll(birdIds) {
  return new Promise((resolve, reject) => {
    conn.connect(err => {
      let list = "("
      birdIds.forEach(birdId => {
        list += `${birdId}, `
      })
      const stat = `SELECT * FROM geospatials WHERE bird_id IN ${list.substring(
        0,
        list.length - 2,
      )})`
      conn.query(stat, (err, res) => {
        if (err) throw err
        resolve(JSON.stringify(res))
      })
    })
  })
}
