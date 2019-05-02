const express = require("express");
const History = require("../models/history");
const router = express.Router();

router.get("/", (req, res, next) => {
	History.GetQueries((err, result) => {
		let response;
		if (result.length === 0) {
			response = undefined;
		}
		else {
			response = JSON.parse(result[0].data).queries;
		}
		
		res.render('layout', {
			title : "Search history",
			view : "search-history",
			records : response
		});
	});
});

module.exports = router;