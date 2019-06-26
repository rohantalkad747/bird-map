const sql = require("mysql")

const con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "birdmap",
})

module.exports = {
  create,
  getAll,
}

/**
 * Creates a geospatial entry in the database.
 * @param {} geoJSON
 */
async function create(geoJSON) {
  if (
    geoJSON.lat < 0 ||
    geoJSON.lat > 90 ||
    geoJSON.lng < 0 ||
    geoJSON.lng > 180
  ) {
    throw Error("Invalid lat/long!")
  }
  if (!geoJSON.birdId || !geoJSON.numb || !geoJSON.dateTaken) {
    throw Error("One or more fields is null!")
  }
  con.connect(err => {
    if (err) throw err
    const stat =
      `INSERT INTO geospatials (user_id, bird_id, numb, descr, date_taken, lat, lng)` +
      ` VALUES (${geoJSON.birdId}, ${geoJSON.numb}, ${geoJSON.descr}, ${
        geoJSON.dateTaken
      }, ${geoJSON.lat}, ${geoJSON.lng})`
    con.query(stat, (err, res) => {
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
    con.connect(err => {
      let list = "("
      birdIds.forEach(birdId => {
        list += `${birdId}, `
      })
      const stat = `SELECT * FROM geospatials WHERE bird_id IN ${list.substring(
        0,
        list.length - 2,
      )})`
      con.query(stat, (err, res) => {
        if (err) throw err
        resolve(JSON.stringify(res))
      })
    })
  })
}
