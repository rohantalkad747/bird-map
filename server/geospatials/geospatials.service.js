const sql = require('mysql');

const con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'birdmap'
});

async function create(geoJSON) {
}

