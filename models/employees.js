const db = require("./db");

let Employees = {};

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