var createError = require("http-errors");
var express = require("express");
var path = require("path");
require("dotenv").config();

const bodyParser = require('body-parser');

const connectEnsureLogin = require('connect-ensure-login'); //authorization

var app = express();

var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo");
const session = require("express-session");
var flash = require("express-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var foodRouter = require("./routes/foodRoutes");
var driverRouter = require("./routes/driverRoute");

var dealerRouter = require("./routes/dealerRoute");
var otpRouter = require("./routes/otpRoute");
const exp = require("constants");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());

//session
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI}),
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/foodRoute", foodRouter);
app.use("/driver", driverRouter);
app.use("/dealer", dealerRouter);

app.use("/otp", otpRouter);


//mongoose connection
mongoose.connect(
    "mongodb+srv://beastkun:beastkun@cluster0.vgnsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render("error_404");
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});


module.exports = app;