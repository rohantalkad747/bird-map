const sql = require('mysql');

const conn = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "birdmap"
});

async function addBirds(json) {
  conn.connect((err) => {
    if (err) throw err;
    json.birds.forEach(bird => {
      conn.query(
        `INSERT INTO birds (bird_name) VALUES (${bird.name})`, (err, res) => {
          if (err) throw err;
          return res;
        })
    });
  });
}

async function getBirds() {
  conn.connect((err) => {
    conn.query(`SELECT * FROM birds`,
      (err, res) => {
      if (err) throw err;
      return res;
      });
  });
}
