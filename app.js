const createError = require("http-errors");
const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash-messages');
const fileupload = require('express-fileupload');

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var trackRouter = require("./routes/track");
var courierRouter = require("./routes/courier");
var adminRouter = require("./routes/admin");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(session({secret:'onetwokafour',resave: true, saveUninitialized: true}));
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/courier", courierRouter);
app.use("/track", trackRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

mongoose.connection.on('error', () => console.log("error in mongoose"));
mongoose.connection.on('connection',() => console.log("Connection success"));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/citycourier',{ useNewUrlParser: true, useUnifiedTopology: true });
// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
