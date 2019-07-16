/**
 * ===============================================================================================
 * This module contains service functions for creating and reading geospatial coordinates of birds.
 * @author Rohan
 * ===============================================================================================
 */

const GeoJSONModel = require("../models/geojson.model");
const { getConn } = require("./db.service");

/**
 * Creates a geospatial entry for the given bird in the database.
 * @param geoJSON must have the following fields
 *  - lat The lattitude of the bird.
 *  - lng The longitude of the bird.
 *  - birdId The primary key of the bird.
 *  - numb The number of birds found.
 *  - datae The date of the sighting.
 */
async function create(geoJSON) {
  const geospatial = new GeoJSONModel.Builder()
    .withLat(geoJSON.lat)
    .withLng(geoJSON.lng)
    .withBirdId(geoJSON.birdId)
    .withNumb(geoJSON.numb)
    .withDateTaken(geoJSON.dateTaken)
    .build();
  const { birdId, numb, descr, dateTaken, lat, lng } = geospatial;
  const stat =
    `INSERT INTO geospatials (user_id, bird_id, numb, descr, date_taken, lat, lng)` +
    ` VALUES ('${birdId}', '${numb}', '${descr}', '${dateTaken}', '${lat}', '${lng}')`;
  const conn = await getConn();
  await conn.execute(stat);
  await conn.end();
}

/**
 * Returns all the geospatial entries for the given birdIds.
 * @param birdIds An array of birdIds.
 */
async function getAll(birdIds) {
  let list = "(";
  birdIds.forEach(birdId => {
    list += `'${birdId}', `;
  });
  const stat = `SELECT * FROM geospatials WHERE bird_id IN ${list.substring(
    0,
    list.length - 2
  )})`;
  const conn = await getConn();
  const rawBirds = await conn.execute(stat);
  await conn.end();
  return JSON.stringify(rawBirds);
}

module.exports = {
  create,
  getAll
};
