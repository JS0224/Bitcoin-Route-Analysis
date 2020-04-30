var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
/*  fs.readFile('index.html', function (err,data){
    if(err){
      console.log(err)
    }else{
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(data)
    }
  });*/
  //res.render('index', { title: 'Express' });
});

module.exports = router;
