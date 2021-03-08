const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/* ------------------------------ routes import ----------------------------- */
const indexRoute = require("./routes/index");
const presensiRoute = require("./routes/presensi");
const kelasRoute = require("./routes/kelas");

const app = express();

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* ------------------------------ routes ----------------------------- */
app.use("/", indexRoute);
app.use("/v1/presensi", presensiRoute);
app.use("/v1/kelas", kelasRoute);

module.exports = app;
