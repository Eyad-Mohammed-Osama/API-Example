const express = require("express");
const router = express.Router();
const employees = require("../models/employees");

router.get("/", (req, res, next) => {
  	employees.GetAllEmployees(-1, (err, result) => {
		res.setHeader("Content-Type", "application/json");
		res.send(result);
	});
});

router.get("/limit/:limit([0-9]+)", (req, res, next) => {
	employees.GetAllEmployees(req.params.limit, (err, result) => {
	  res.setHeader("Content-Type", "application/json");
	  res.send(result);
  	});
});

router.get("/firstname/:fname", (req, res, next) => {
	employees.GetEmployeesByFirstName(req.params.fname, -1, (err, result) => {
		res.setHeader("Content-Type", "application/json");
		res.send(result);
	});
});

router.get("/firstname/:fname/limit/:limit([0-9]+)", (req, res, next) => {
	employees.GetEmployeesByFirstName(req.params.fname, req.params.limit, (err, result) => {
		res.setHeader("Content-Type", "application/json");
		res.send(result);
	});
});

module.exports = router;
