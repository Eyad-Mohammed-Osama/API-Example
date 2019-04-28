const mysql = require("mysql");
const credentials = require("./db-credentials");
const connection = mysql.createConnection({
    host : credentials.host,
    port : credentials.port,
    user : credentials.user,
    password : credentials.password,
    database : credentials.database
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;