const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const login = require("../../lib/login");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("src/static"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

/* -------------------------------- frontend -------------------------------- */

app.get("/", async function (req, res) {
	res.sendFile("index.html", { root: path.join(__dirname, "./static") });
});

/* -------------------------------- backend -------------------------------- */
app.post("/presensi", async (req, res) => {
	// const { page, browser } = await login(req.body);
	
});


app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
