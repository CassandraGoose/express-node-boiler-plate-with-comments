var express = require('express');
var router = express.Router();


// PRO tip
// some other funcitonality that may live in here is: 
// validations. You want to make sure the data you're getting from the request is safe and valid.
// queries or imported query functionality so you can access data form your Database!
// POST, PUT, PATCH, DELETE routes.
// You may also utilize the req, res, and next arguments.
  // req: request object. use maybe to grab an id or check the body of the request
  // res: response object. send json with this! 
  // next: next function. executes the upcoming middleware. maybe use to trigger errors.

/* GET home page. */
router.get('/', function(req, res, next) {
  //NEW removed render functionality and instead am going to use res (an argument we have access to)
  // to send JSON instead!
  res.json({
    message: 'Hello, world! Data would go here.'
  })
});

module.exports = router;
