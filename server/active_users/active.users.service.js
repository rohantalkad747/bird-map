const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'birdmap'
});

async function addActiveUser(userParams) {
    con.connect((err) => {
        const date = (new Date()).toDateString();
        const stat = `INSERT INTO active_users (userId, token, loggedOn) VALUES (${userParams.id}, ${userParams.token}, ${date})`;
    });
}

async function checkToken(userParams){
    con.connect((err) => {
        if (err) throw err;
        const stat = `SELECT username FROM active_users WHERE token = ${userParams.token}`;
        con.query(stat, (err, res) => {
            if (err) throw err;
            return (res && res == userParams.username);
        })
    });
}
