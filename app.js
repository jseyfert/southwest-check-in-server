var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var checkIn = require('./routes/checkIn');
var submitCheckIn = require('./routes/submitCheckIn');

require('dotenv').config();

var app = express();

// //////////////////////////////

// Hawaii     // "Pacific/Honolulu"            // "HI"     
// Alaska     // "America/Denver/Anchorage"    // "AL"        
// Pacific    // "America/Los_Angeles"         // "PA"         
// Mountain   // "America/Denver"              // "MT"     
// Central    // "America/Chicago"             // "CE"     
// Eastern    // "America/New_York"            // "ES"     

// var moment = require('moment-timezone');

// var losAngelesCurrent = moment().tz("America/Los_Angeles").format();
// var denverCurrent = moment().tz("America/Denver").format();
// var chicagoCurrent = moment().tz("America/Chicago").format();
// var newYorkCurrent = moment().tz("America/New_York").format();

// var d = new Date();
// var losAngelesDeparture =  moment.tz(d, "America/Los_Angeles").format();
// var denverDeparture =  moment.tz(d, "America/Denver").format(); 
// var chicagoDeparture = moment.tz(d, "America/Chicago").format(); 
// var newYorkDeparture = moment.tz(d, "America/New_York").format(); 

// var test1 = moment.tz("2013-11-18 11:55", "America/Los_Angeles").format(); 
// var test2 = moment.tz("2013-11-18 11:55", "America/Denver").format(); 
// var test3 = moment.tz("2013-11-18 11:55", "America/Chicago").format(); 
// var test4 = moment.tz("2013-11-18 11:55", "America/New_York").format(); 

// console.log(losAngelesCurrent);
// console.log(denverCurrent);
// console.log(chicagoCurrent);
// console.log(newYorkCurrent);
// console.log('===================');
// console.log(losAngelesDeparture);
// console.log(denverDeparture);
// console.log(chicagoDeparture);
// console.log(newYorkDeparture);
// console.log('===================');
// console.log(test1);
// console.log(test2);
// console.log(test3);
// console.log(test4);

// //////////////////////////////


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', function(){ console.log('Connected to database'); });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/checkIn', checkIn);
app.use('/submitCheckIn', submitCheckIn);

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
