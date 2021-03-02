const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/* ------------------------------ routes import ----------------------------- */
const indexRouter = require("./routes/index");
const presensiRoute = require("./routes/presensi");
const updateRoute = require("./routes/update");

const app = express();

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* ------------------------------ routes ----------------------------- */
app.use("/", indexRouter);
app.use("/v1/presensi", presensiRoute);
app.use("/v1/update", updateRoute);

module.exports = app;
