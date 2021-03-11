const express = require("express");
const cookieParser = require("cookie-parser");

const WebSocket = require("ws");
const wss = new WebSocket.Server({ noServer: true });

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

// server.on("upgrade", function upgrade(request, socket, head) {
// 	wss.handleUpgrade(request, socket, head, function done(ws) {
// 		wss.emit("connection", ws, request);
// 	});
// console.log("Test");
// if (pathname === "/ws") {
// 	wss.handleUpgrade(request, socket, head, function done(ws) {
// 		wss.emit("connection", ws, request);
// 	});
// } else {
// 	socket.destroy();
// }
// });

// module.exports = app;
