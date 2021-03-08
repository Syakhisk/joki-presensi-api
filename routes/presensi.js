const login = require('../lib/pptr/Login');
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.post("/", async function (req, res, next) {
	// res.send(req.body);
	const { page, browser } = await login(req.body);
  // absen ke presensi
  // send response
});

module.exports = router;
