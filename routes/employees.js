const express = require("express");
const router = express.Router();
const employees = require("../models/employees");
const {check, validationResult} = require("express-validator/check");

// Here, we're doing nothing but encapsulating the APIs inside routers methods
// So users can access the APIs through the provided routers

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

router.get("/firstname/:fname", [
		check("fname").isAlpha()
		.withMessage("Firstname must only contain alphabetic characters")
	], (req, res, next) => {
		res.setHeader("Content-Type", "application/json");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.send({
				errors : errors.array()
			});
			return;
		}
		employees.GetEmployeesByFirstName(req.params.fname, -1, (err, result) => {
			res.send(result);
		});
	});

router.get("/firstname/:fname/limit/:limit",[
			check("fname")
			.isAlpha()
			.withMessage("Firstname must only contain alphabetic characters"),
			check("limit")
			.isInt()
			.withMessage("Limit must be an integer")
		], (req, res, next) => {
			res.setHeader("Content-Type", "application/json");
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.send({
					errors : errors.array()
				});
				return;
			}

			employees.GetEmployeesByFirstName(req.params.fname, req.params.limit, (err, result) => {
				res.send(result);
			});
		});

router.post("/", [
		check("firstname").isAlpha()
		.withMessage("Firstname must only contain alphabetic characters")
	], (req, res, next) => {
		res.setHeader("Content-Type", "application/json");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.send({
				errors : errors.array()
			});
			return;
		}
		employees.GetEmployeesByFirstName(req.body.firstname, -1, (err, result) => {
			res.send(result);
		});
	});

module.exports = router;
