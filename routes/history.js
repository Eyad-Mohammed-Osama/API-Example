const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log(req.session.queries)
    res.render('layout', {
		title : "Search history",
        view : "search-history",
        records : req.session.queries 
	});
});

module.exports = router;