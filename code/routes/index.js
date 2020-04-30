var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('index.html', function (err,data){

  });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
