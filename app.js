const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const indexRouter = require("./routes/index");
const employeesRouter = require("./routes/employees");
const historyRouter = require("./routes/history");
const referenceRouter = require("./routes/reference");

const db = require("./models/db");
const credentials = require("./models/db-credentials");

const app = express();
const sessionStore = new MySQLStore({
	host : credentials.host,
	port : credentials.port,
	user : credentials.user,
	password : credentials.password,
	database : credentials.database,
	clearExpired : true,
	checkExpirationInterval : 3600000,	// Each hour, let's check whether there are expired sessions to remove
	charset : "utf8_bin"
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ 
	key : "global_session_cookie",
	secret : "This is a secret",
	store : sessionStore,
	resave : false,
	saveUninitialized : false,
	cookie : {
		maxAge : 1440000	// Each session is valid for 24 minutes
	}
}));

app.use("/", indexRouter);
app.use("/employees", employeesRouter);
app.use("/search-history", historyRouter);
app.use("/reference", referenceRouter);
app.use("*", (req, res, next) => {
	res.status(404).send("<h1>Error 404: Page not found</h1>");
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};


	// render the error page in a good look
	res.status(err.status || 500);
	res.render("layout", {
		title : "An error has occured",
		view : "error",
		error : err
	});
});

module.exports = app;
