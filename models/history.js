const db = require("./db");

let History = {};

History.GetQueries = (result) => { 
    const query = "SELECT * FROM `sessions`";
    db.query(query, (err, res, fields) => {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = History;