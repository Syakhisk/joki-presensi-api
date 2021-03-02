const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const login = require("./lib/login");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("src/static"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

/* -------------------------------- frontend -------------------------------- */

app.get("/", async function (req, res) {
	res.sendFile("index.html", { root: path.join(__dirname, "./static") });
});

app.post("/log", async (req, res) => {
	res.send(req.body);
	res.sendFile("process.html", { root: path.join(__dirname, "./static") });
});

/* -------------------------------- backend -------------------------------- */
app.post("/presensi", async (req, res) => {
	const { page, browser } = await login(req.body);
});

/* --------------------------------- stream --------------------------------- */

app.get("/stream", function (req, res, next) {
	// res.setHeader("Content-Type", "application/json");
	// res.setHeader("Transfer-Encoding", "chunked");

	res.write("{");
	sendAndSleep(res, 1);
});

var sendAndSleep = function (response, counter) {
	if (counter > 10) {
		response.write("}");
		response.end();
	} else if (counter <= 9) {
		response.write(`"status${counter}": "${counter}",`);
		counter++;
		setTimeout(function () {
			sendAndSleep(response, counter);
		}, 500);
	} else {
		response.write(`"status${counter}": "${counter}"`);
		counter++;
		setTimeout(function () {
			sendAndSleep(response, counter);
		}, 500);
	}
};

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
