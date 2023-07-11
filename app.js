// use a createError function to generate errors with appropriate properties easily
var createError = require('http-errors');
// gives you some features for web applications so you can build an api
var express = require('express');
// utilities for working with file and direcotry paths
var path = require('path');

// middleware that lets you deal with cookies
var cookieParser = require('cookie-parser');
// middleware that logs info about incoming http requests and responses
var logger = require('morgan');

// part of the setup for using a modular routing system 
// check out the files index.js and user.js to see them use express.Router()
// express.Router() creates an instance of Router to allow for module route handlers. 
// a route handler is the code that gets a request at a certain URL and does something with it. 
// Let's take a look at what the two routes we have do. 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// instance of express
var app = express();

// view engine setup
// if we have views, then this is the system we would use. 
// I'm not going to cover a server that includes views, so we can ignore these. 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// tell the express instance to use these tools. 
// the logger we required earlier
app.use(logger('dev'));
// express.json() is built in middleware to parse incoming requests with JSON payloads.
app.use(express.json());
// express.urlencoded() is a built in middleware to parse incoming requests with URL-encoded payloads. ( a request that uses content-type: application/x-www-form-urlencoded or similar)
app.use(express.urlencoded({ extended: false }));
// the cookie parser we required earlier
app.use(cookieParser());
// built in middleware that serves static files using the path tool we required earlier
app.use(express.static(path.join(__dirname, 'public')));

// part of the setup for using a modular routing system 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// recall that a 404 message isn't _actually_ an error, so error handling won't catch it.
// this little chunk of code catches those 404s and turns them into errors for us. neat!
app.use(function(req, res, next) {
  next(createError(404));
});
// Note: app.use accepts a callback function that accepts various arguments. 
// you'll use some of those arguments in some situations
// and others in other situations. 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals is a property that contains local variables scoped to the request.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
