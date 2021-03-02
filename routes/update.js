const express = require("express");
const router = express.Router();
const login = require("../lib/login");
const getClass = require("../lib/get-class");

router.post("/", async (req, res, next) => {
	const { page, browser } = await login(req.body);
	const classList = await getClass(page, browser);

	// return array of class
	// console.log(classList);
	res.status(200).send(classList);
});

module.exports = router;
