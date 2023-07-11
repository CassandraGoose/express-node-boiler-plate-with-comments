var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render is for views! let's look at it, but we won't be digging into it. 
  res.render('index', { title: 'Express' });
});

module.exports = router;
