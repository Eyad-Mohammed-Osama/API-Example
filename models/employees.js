const db = require("./db");

// An object to store API methods
let Employees = {};

// This method is an API that query the database for all employees with an optional limit
Employees.GetAllEmployees = (limit = -1, result) => {
    let query = "SELECT * FROM `employees`";
    if (limit > -1) {
        query += " LIMIT " + db.escape(Number.parseInt(limit));
    }
    db.query(query , (err, res, fields) => {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

// This method is an API that query the database for all employees with a specific
// Part in their firstnames and an optional limit
Employees.GetEmployeesByFirstName = (firstname, limit = -1, result) => {
    let query = "SELECT * FROM `employees` WHERE `first_name` LIKE " + 
    db.escape(firstname + "%");
    if (limit > -1) {
        query += " LIMIT " + db.escape(Number.parseInt(limit));
    }
    db.query(query , (err, res, fields) => {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Employees;