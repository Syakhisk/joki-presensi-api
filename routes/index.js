const express = require("express");
const router = express.Router();
const config = require("../config");

const { siteUrl } = config;

/*
 * redirect to frontend
 */
router.get("/", function (req, res, next) {
	res.status(200).redirect(siteUrl);
});

module.exports = router;
