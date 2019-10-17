/**
 * ===============================================================================================
 * This module contains service functions for creating and reading geospatial coordinates of birds.
 * @author Rohan
 * ===============================================================================================
 */

const GeoJSONModel = require("../models/geojson.model");
const { getConn } = require("./db.service");
const { convertJSON, formatDate } = require("../util/util");
const EARTH_DIAMETER = 6371e3;
const MONTHLY = "MONTHLY";
const YEARLY = "YEARLY";

/**
 * Creates a geospatial entry for the given bird in the database.
 * @param geoJSON must have the following fields
 *  - lat The latitude of the bird.
 *  - lng The longitude of the bird.
 *  - birdId The primary key of the bird.
 *  - numb The number of birds found.
 *  - date The date of the sighting.
 */
async function createBirdCoordinate(geoJSON) {
  const geospatial = buildGeospatial(geoJSON);
  if (await birdEntryAlreadyExists(geospatial))
    throw Error("Entry already exists with the exact same fields!");
  const stat = buildBirdCordStat(geospatial);
  const conn = await getConn();
  await conn.execute(stat);
  await conn.end();
}

function buildGeospatial(geoJSON) {
  const dateTaken = new Date(geoJSON.dateTaken);
  return new GeoJSONModel.Builder()
    .withLat(geoJSON.lat)
    .withLng(geoJSON.lng)
    .withDescr(geoJSON.descr)
    .withBirdId(geoJSON.birdId)
    .withNumb(geoJSON.numb)
    .withDateTaken(dateTaken)
    .build();
}

async function birdEntryAlreadyExists(geoJSON) {
  const { birdId, numb, descr, dateTaken, lat, lng } = geoJSON;
  const res = `SELECT * FROM geospatials
       WHERE date_taken = '${dateTaken}' AND
             lat = '${lat}' AND
             lng = '${lng}'`;
  const conn = await getConn();
  const birds = await conn.execute(res);
  return convertJSON(birds[0]).length > 0;
}

/**
 * Builds a bird coordinate statement from a GeoJSON instance.
 * @param geospatial
 * @return {string}
 */
function buildBirdCordStat(geospatial) {
  const { birdId, numb, descr, dateTaken, lat, lng } = geospatial;
  const stat =
    `INSERT INTO geospatials (bird_id, numb, descr, date_taken, lat, lng)` +
    ` VALUES ('${birdId}', '${numb}', '${descr}', '${dateTaken}', '${lat}', '${lng}')`;
  return stat;
}

/**
 * Returns all the geospatial entries for the given birdIds.
 * @param birdIds An array of birdIds.
 * @param? dateRange This optional parameter returns only entries between the given dates.
 */
async function getAllBirdCoordinates(birdIds, dateRange) {
  if (birdIds.length === 0) return [];
  const dateRangeStat = prepareDateRange(dateRange);
  const birds = "(" + birdIds.join(", ") + ")";
  const stat =
    `
   SELECT lat, lng, date_taken, descr, birds.bird_name 
   FROM geospatials
   FULL JOIN birds
   ON bird_id = birds.id
   WHERE bird_id IN ${birds}` + dateRangeStat;
  const conn = await getConn();
  const rawBirds = await conn.execute(stat);
  await conn.end();
  return convertJSON(rawBirds[0]);
}

function prepareDateRange(dateRange) {
  if (isValid(dateRange))
    return ` AND date_taken BETWEEN '${formatDate(
      new Date(dateRange.from)
    )}' AND '${formatDate(new Date(dateRange.to))}'`;
  return "";
}

function isValid(dateRange) {
  return dateRange && dateRange.from && dateRange.to;
}

/**
 * Returns all bird geospatial objects.
 */
async function getAllBirds() {
  const conn = await getConn();
  const stat = "SELECT * FROM birds";
  const rawBirds = await conn.execute(stat);
  await conn.end();
  return convertJSON(rawBirds[0]);
}

async function getBirdsWithDateConstraint(birdId, options) {
  const conn = getConn();
  const stat = `SELECT * FROM geospatials WHERE bird_id = ${birdId}` + options.MONTHLY ? yearConstraint : "";
  const rawBirds = await conn.execute(stat[0]);
}

/**
 * Returns the number of birds as per the optional constraints.
 * @param birdIds
 * @param dateRange (MONTHLY -> year, YEARLY), region(coords, radius)
 * @return {Promise<void>}
 */
async function getNumberOfBirds(birdIds, options) {
  const birdsToQuantity = {};
  for (const birdId of birdIds) {
    const birds  = getBirdsWithDateConstraint(birdId, options);
    for (const bird of birds) {
      if (calculateDistance(options.origin, { lat: bird.lat, lng: bird.lng }) < options.radius) {
        if (options.MONTHLY) {
          const month = bird.date_taken.getMonth();
          if (birdsToQuantity[month] == null) {
            birdsToQuantity[month] = 1;
          } else {
            birdsToQuantity[month]++;
          }
        } else {
        }
      }
    }
  }
}

function getYearConstraint(dateRange) {
  const { year } = dateRange;
  return `AND date_taken BETWEEN '01/01/${year}' AND '01/01/${year + 1}'`;
}

function getBirds() {}

/**
 * Returns the distance in meters between two coordinates.
 * @return {number}
 */
function calculateDistance(cordOne, cordTwo) {
  const latOne = cordOne.lat.toRadians();
  const latTwo = cordTwo.lat.toRadians();
  const diffLat = (cordTwo.lat - cordOne.lat).toRadians();
  const diffLng = (cordTwo.lng - cordOne.lng).toRadians();
  const halfSqrOfChord =
    Math.pow(Math.sin(diffLat / 2), 2) +
    Math.cos(latOne) * Math.cos(latTwo) * Math.pow(Math.sin(diffLng / 2), 2);
  const angularDist =
    2 * Math.atan2(Math.sqrt(halfSqrOfChord), Math.sqrt(1 - halfSqrOfChord));
  return EARTH_DIAMETER * angularDist;
}

module.exports = {
  getAllBirds,
  getAllBirdCoordinates,
  createBirdCoordinate
};
