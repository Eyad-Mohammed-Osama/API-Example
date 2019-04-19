const express = require("express");
const axios = require("axios");
const db = require("../models/db");
const router = express.Router();

router.get('/', (req, res, next) => {

	const host = "http://" + req.headers.host + "/employees/firstname/A/limit/1000";

	axios.get(host).then((response) => {
		res.set({"Content-Type" : "text/html"});
		res.render('index', {
			EmployeesTable : response.data,
			NumberOfEmployees : response.data.length,
			title : "Index"
		});
	}).catch((err) => {
		console.log(err);
	});
});

module.exports = router;
