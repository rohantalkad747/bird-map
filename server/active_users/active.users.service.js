const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'birdmap'
});

async function addActiveUser(userParam.id) {
    con.connect((err) => {
        const token = generateToken();
        const date = (new Date()).toDateString();
        const stat = `INSERT INTO active_users (userId, token, loggedOn) VALUES (${userParams.id}, ${token}, ${date})`;
    });
}

function generateToken(userId) {
    const date = new Date();
    return ((date.getSeconds() * date.getMilliseconds()) + userId);
}