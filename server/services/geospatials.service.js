/**
 * ===============================================================================================
 * This module contains service functions for creating and reading geospatial coordinates of birds.
 * @author Rohan
 * ===============================================================================================
 */

const GeoJSONModel = require("../models/geojson.model");
const { getConn } = require("./db.service");
const { convertJSON, formatDate } = require("../util/util");

/**
 * Creates a geospatial entry for the given bird in the database.
 * @param geoJSON must have the following fields
 *  - lat The latitude of the bird.
 *  - lng The longitude of the bird.
 *  - birdId The primary key of the bird.
 *  - numb The number of birds found.
 *  - datae The date of the sighting.
 */
async function createBirdCoordinate(geoJSON) {
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
 * [@param] dateRange This optional parameter returns only entries between the given dates.
 */
async function getAllBirdCoordinates(birdIds, dateRange) {
  if (birdIds.length === 0) return [];
  let dateRangeStat;
  if (dateRange && dateRange.from && dateRange.to) {
    dateRangeStat = ` WHERE date_taken >= ${formatDate(dateRange.from)} AND date_taken <= ${formatDate(dateRange.to)}`;
  }
  const birds = "(" + birdIds.join(", ") + ")";
  const stat = `SELECT * FROM geospatials WHERE bird_id IN ${birds}` + (dateRangeStat || "");
  const conn = await getConn();
  const rawBirds = await conn.execute(stat);
  await conn.end();
  return convertJSON(rawBirds[0]);
}

/**
 * Returns all birds.
 */
async function getAllBirds() {
  const conn = await getConn();
  const stat = "SELECT * FROM birds";
  const rawBirds = await conn.execute(stat);
  await conn.end();
  return convertJSON(rawBirds[0]);
}

module.exports = {
  getAllBirds,
  getAllBirdCoordinates,
  createBirdCoordinate
};
