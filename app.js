const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const indexRouter = require("./routes/index");
const employeesRouter = require("./routes/employees");
const historyRouter = require("./routes/history");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret : "This is a secret" }));

app.use("/", indexRouter);
app.use("/employees", employeesRouter);
app.use("/history", historyRouter);
app.use("*", (req, res, next) => {
	res.status(404).send("<h1>Error 404: Page not found</h1>");
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	console.log(err.stack)
	// render the error page
	res.status(err.status || 500);
	res.render("error", {
		message : err.message,
		error : err
	});
});

module.exports = app;
