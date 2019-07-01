// Middleware imports
require("rootpath")();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
// app.use("/users", require("./controllers/users.controller"));
// app.use("/files", require("./controllers/files.controller"));
// app.use("/geospatials", require("./controllers/geospatials.controller"));

const GeoJSONModel = require('./models/geojson.model');
(new GeoJSONModel.Builder()).withLat(-500).build();

const port =
  process.env.NODE_ENV === "production" ? process.env.port || 80 : 2500;
app.listen(port, () => console.log(`Listening on port ${port}`));
