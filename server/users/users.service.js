const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { con } = require('../database/db');
const mysql = require('mysql');

const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root123',
        database: 'birdmap'
});
// CRUD Operations

async function create(userParams) {
    const params = await getUserParams(userParams);
    if (userExists(username)) {
        throw "Username already exists";
    }
    con.connect((err) => {
        if (err) throw err;
        if (defPass) {
            const pass = bcrypt.hashSync(defPass, 10);
            const created = (new Date()).toDateString();
            const vals = `INSERT INTO users (first, last, post, email, username, hashed, created)` +
                ` VALUES (${params[0]}, ${params[1]}, ${params[2]}, ${params[3]}, ${params[4]}, ${params[5]}, ${created})`;
            con.query(vals, (err, res) => {
                if (err) throw err;
                console.log("One user was added.");
            });
        }
    });
}

async function update(userParams) {
    if (!(userExists)) {
        throw "User does not exist!";
    }
    const params = await getUserParams(userParams);
    con.connect((err) => {
        if (err) throw err;
        var pass;
        if (defPass) {
            pass = bcrypt.hashSync(userParams.password, 10);
        }
        else {
            con.query(`SELECT hashed FROM users WHERE username = ${params[0]}`, (err, res) => {
                if (err) throw err;
                pass = res;
            })
        }
        const vals = `UPDATE users 
        SET first=${params[0]} last=${params[1]} post = ${params[2]} email = ${params[3]} username = ${params[4]} hashed = ${pass}`;
        con.query(vals, (err, res) => {
            if (err) throw err;
            console.log("One user was added.");
        });
    });



}

async function userExists(username) {
    const stat = `SELECT COUNT(*) FROM users WHERE username = ${username}`;
    con.connect((err) => {
        if (err) throw (err);
        con.query(stat, (err, res => {
            if (err) throw err;
            return (res != 0);
        }));
    });
}

async function getAll() {
    con.connect((err) => {
        if (err) throw err;
        con.query('SELECT * from USERS LIMIT 1000')
    })
}

async function getUserParams (userParams) {
    const first = userParams['first'];
    const last = userParams['last'];
    const post = userParams['post'];
    const email = userParams['email'];
    const username = userParams['username'];
    // User-defined password to be hashed by the BCrypt hashing algorithm
    const defPass = userParams['password'];
    return [first, last, post, email, username, defPass];
}

async function _delte(usename) {
    con.connect((err) => {
        if (err) throw err;
        con.query(`DELETE FROM users WHERE username = ${usename}`, (err, res) => {
            if (err) throw err;
        });
    });
}