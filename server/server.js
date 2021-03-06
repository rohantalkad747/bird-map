// Middleware imports
require("rootpath")();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const session = require("client-sessions");
require("dotenv").config();

app.use(
  session({
    cookieName: "session",
    secret: process.env.COOKIE_SECRET,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", require("./controllers/users.controller"));
app.use("/api/files", require("./controllers/files.controller"));
app.use("/api/birds", require("./controllers/geospatials.controller"));

const port =
  process.env.NODE_ENV === "production" ? process.env.port || 80 : 2500;
app.listen(port, () => console.log(`Listening on port ${port}`));
