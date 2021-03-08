const express = require("express");
const router = express.Router();

const login = require("../lib/pptr/Login");
const getClass = require("../lib/pptr/GetClass");
const isEmpty = require("../lib/ValidateObject");

const storeUsage = require("../service/StoreUsage");

router.post("/", async (req, res, next) => {
	/** Check if the request body is empty*/
	if (isEmpty(req.body)) {
		res.status(400).send("Bad request, empty body.");
		return;
	}

	/** Check if login success*/
	const { page, browser } = await login(req.body);
	if (!page || !browser) {
		res
			.status(404)
			.send(
				"User not found, check whether you are using incorrect username or password"
			);
		return;
	}

	/** Get all the class */
	const classList = await getClass(page, browser);
	if (!classList) {
		res.status(404).send("Classes not found");
		return;
	}

	await storeUsage({ nrp: req.body.nrp, name: classList.name });

	res.status(200).send(classList);
});

module.exports = router;
