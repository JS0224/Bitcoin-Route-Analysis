var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
app.io = require('socket.io')();
//var io = socketio.listen(server);
const mariaDB = require('./public/javascripts/mariaDB');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('ErrorPage.html');
});

//io event receive & emit
app.io.sockets.on('connection', function (socket){
  let sql, rows;
  //Block
  socket.on('block', function(height){
    sql = mariaDB.getSql('Blocks') + height;
    rows = mariaDB.getDataFromDB(sql);
    rows.then(function(data){
          console.log("Block:", data[0]);
          socket.emit('found block',data[0]);
    });
  });

  //Transactions
  socket.on('tx', function(tx_hash){
    sql = mariaDB.getSql('Transactions') + "\"" + String(tx_hash)+ "\"" ;
    console.log("tr sql:", sql);
    rows = mariaDB.getDataFromDB(sql);
    rows.then(function(data){
      console.log("trans: ",data);
      socket.emit('found tx',data[0]);
    });
  });

  //Address
  socket.on('addr', function(addr){
    sql = mariaDB.getSql('Addresses') + "\"" + String(addr) + "\"";
    console.log("addr sql", sql);
    rows = mariaDB.getDataFromDB(sql);
    rows.then(function(data){
      console.log("addr : ", data[0]);
      socket.emit('found addr',data[0]);
    });
  });
});

module.exports = app;
