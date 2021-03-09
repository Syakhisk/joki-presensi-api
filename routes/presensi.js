const express = require("express");
const Hadir = require("../lib/pptr/Hadir");
const router = express.Router();

const login = require("../lib/pptr/Login");
const isEmpty = require("../lib/ValidateObject");

const storeUsage = require("../service/StoreUsage");

router.post("/", async function (req, res, next) {
	// res.status(202).send({ msg: "work" });
	// return;

	const { nrp, password, selectedClass, code, date } = req.body;
	if (!nrp || !password || !selectedClass || !code || !date) {
		res.status(400).send({ msg: "Bad request, missing body." });
		return;
	}

	/** Check if the request body is empty */
	if (isEmpty(req.body)) {
		res.status(400).send({ msg: "Bad request, empty body." });
		return;
	}

	/** Check if login success*/
	const { page, browser } = await login(req.body);
	if (!page || !browser) {
		res.status(404).send({
			msg:
				"User not found, check whether you are using incorrect username or password",
		});
		return;
	}

	const presensi = await Hadir(req.body, page, browser);
	console.log("presensi response:");
	res.status(presensi.code).send({ msg: presensi.msg });
});

module.exports = router;
