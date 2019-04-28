const express = require("express");
const History = require("../models/history");
const router = express.Router();

router.get("/", (req, res, next) => {
	let queries = null;
	History.GetQueries((err, result) => {
		var queries = JSON.parse(result[0].data).queries;
		res.render('layout', {
			title : "Search history",
			view : "search-history",
			records : queries 
		});
	});
});

module.exports = router;