const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.listen(process.env.port || 2500, () => console.log(`Listening on port ${port}`));