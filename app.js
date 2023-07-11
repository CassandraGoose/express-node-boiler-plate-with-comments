var createError = require('http-errors');
var express = require('express');
var path = require('path');

// NEW: removed cookie parser because i'm not going to deal with cookies.
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// NEW: added helmet, which is a tool that sets HTTP response headers for us. 
// this helps protect our apps from XSS and other attacks. It's not a silver bullet, though!
const helmet = require('helmet');
// NEW: added CORS. This way, we can make requests from different origins.
const cors = require('cors');

// PRO tip. You'll probably need to have some kind of environment variable situation. 
// Research .env and packages that may help you with that such as dotenv.

var indexRouter = require('./routes/index');
// NEW: removed user routing system because I am not going to have users

var app = express();

app.use(logger('dev'));
app.use(express.json());
// NEW: removed the static page serving because i'm going to be dealing with only JSON and not views. 

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
