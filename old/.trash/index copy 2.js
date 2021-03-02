const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const login = require("./lib/login");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("src/static"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
	res.sendFile("index.html", { root: path.join(__dirname, "./static") });
});

app.post("/absen", async (req, res) => {
	// res.send(req.body);
	// const { page, browser } = login(req, res);
	// console.log("body:", req.body);
	// res.sendStatus(200);
});

app.get("/stream", function (req, res, next) {
	//when using text/plain it did not stream
	//without charset=utf-8, it only worked in Chrome, not Firefox
	// res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Transfer-Encoding", "chunked");

	res.write("Thinking...");
	sendAndSleep(res, 1);
});

var sendAndSleep = function (response, counter) {
	if (counter > 10) {
		response.end();
	} else {
		response.write(" ;i=" + counter);
		counter++;
		setTimeout(function () {
			sendAndSleep(response, counter);
		}, 500);
	}
};

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
