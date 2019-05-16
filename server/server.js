const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', require('./users/users.controller'));

const port =  process.env.NODE_ENV === 'production' ? (process.env.port || 80): 2500;


app.listen(port, () => console.log(`Listening on port ${port}`));