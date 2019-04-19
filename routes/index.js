const express = require("express");
const axios = require("axios");
const router = express.Router();
const db = require("../models/db");

router.get('/', (req, res, next) => {
	/*
	DELETE FROM `employees` WHERE `emp_no` > 20000
	DELETE FROM `salaries` WHERE `emp_no` > 20000
	SELECT COUNT(`emp_no`) FROM `employees
	SELECT `emp_no` FROM `employees` ORDER BY `emp_no` LIMIT 10000
	*/
	/*
	db.query("SET innodb_lock_wait_timeout=100;\
				DELETE FROM `salaries` WHERE (`salary`,`emp_no`) NOT IN (\
				SELECT MAX(`salary`), `emp_no` FROM (SELECT * FROM `salaries`) AS `s` GROUP BY `emp_no`\
				);", (err, result, fields) => {
		//console.log(result[9999].emp_no);
	});
	*/
	db.query("SELECT `emp_no` FROM `titles`", (err, result, fields) => {
		console.log(result.length);
	});

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
