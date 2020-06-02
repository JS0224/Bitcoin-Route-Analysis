var express = require('express');
var router = express.Router();
//const mariaDB = require('../mariaDB');
//const dbConn = mariaDB.getConnection();
//const Client = require('bitcoin-core');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
  /*let sql ='SELECT id from Blocks where id < 10';
  dbConn.query(sql, function (error, results, fields) {
    if (error) throw error;
      //console.log(results);
  });*/
  //let rows = mariaDB.getDataFromDB(dbConn,sql);
  //console.log("rows:",rows);
});

module.exports = router;
