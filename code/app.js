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
const mariaDB = require('./mariaDB');

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
  socket.on('block', function(data){
    let sql = 'SELECT * from Blocks where id =' + data;
    let rows;
    rows = mariaDB.getDataFromDB(sql);
    rows.then(function(text){
            console.log("text:", text);
    });
    let sql2 = "SELECT id from Blocks where id = 12000";
    let rows2 = mariaDB.getDataFromDB(sql2);
    rows2.then(function(text){
      console.log("text22:", text[0]['id']);
      socket.emit('found wallet',text[0]);
    });

  });
});

module.exports = app;
