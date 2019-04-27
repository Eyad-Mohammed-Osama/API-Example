const express = require("express");
const db = require("../models/db");
const router = express.Router();

router.get('/', (req, res, next) => {
	//res.set({"Content-Type" : "text/html"});
	res.render('layout', {
		title : "Reference",
		view : "reference"
	});
});

module.exports = router;