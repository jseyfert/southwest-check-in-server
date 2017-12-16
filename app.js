// app.js
//   -submitCheckIn.sj
//   -polling.js
//     -checkin.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var index = require('./routes/index');
var checkIn = require('./routes/checkIn');
var submitCheckIn = require('./routes/submitCheckIn');
var getExisting = require('./routes/getExisting');
var deleteTrip = require('./routes/deleteTrip');
var polling = require('./controlers/polling');

require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', function(){ console.log('Connected to database'); });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/checkIn', checkIn);
app.use('/submitCheckIn', submitCheckIn);
app.use('/getExisting', getExisting);
app.use('/deleteTrip', deleteTrip);

var j = schedule.scheduleJob('* * * * *', function(){
  polling()
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
