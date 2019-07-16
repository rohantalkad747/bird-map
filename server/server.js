// Middleware imports
require("rootpath")();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", require("./controllers/users.controller"));
app.use("/files", require("./controllers/files.controller"));
app.use("/geospatials", require("./controllers/geospatials.controller"));

const port =
  process.env.NODE_ENV === "production" ? process.env.port || 80 : 2500;
app.listen(port, () => console.log(`Listening on port ${port}`));
