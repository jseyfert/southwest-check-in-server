var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trip = require('../models/trip.js');
var moment = require('moment-timezone');
var SendMail = require('../config/email.js');
// http://localhost:3000/submitCheckIn/john/seyfert/MWVE2L/johnseyfert@gmail.com/2017-12-05 11:00/PA

router.get('/:firstName/:lastName/:confirmationNumber/:emailAddress/:dateTimeDeparture/:timeZoneDeparture', function(req, res, next) {

  var firstName = req.params.firstName
  var lastName = req.params.lastName
  var confirmationNumber = req.params.confirmationNumber
  var emailAddress = req.params.emailAddress
  var dateSubmitted = new Date();

  var dateTimeDeparture = req.params.dateTimeDeparture
  var timeZoneDeparture = req.params.timeZoneDeparture
  switch (timeZoneDeparture) {
    case 'HI':
      timeZoneDeparture = "Pacific/Honolulu"
      break
    case 'AL':
      timeZoneDeparture = "America/Denver/Anchorage"
      break
    case 'PA':
      timeZoneDeparture = "America/Los_Angeles" 
      break
    case 'MT':
      timeZoneDeparture = "America/Denver" 
      break
    case 'CE':
      timeZoneDeparture = "America/Chicago"
      break
    case 'ES':
      timeZoneDeparture = "America/New_York"
      break
    default:
      timeZoneDeparture = "ERROR"
  }
  console.log('dateTimeDeparture', dateTimeDeparture);
  console.log('timeZoneDeparture', timeZoneDeparture);

  var dateTimeZoneDeparture = moment.tz(dateTimeDeparture, timeZoneDeparture).format();
  console.log('dateTimeZoneDeparture', dateTimeZoneDeparture);

  var dateToExecute = moment(dateTimeZoneDeparture).subtract(1, 'days');


  Trip.findOne({ confirmationNumber: confirmationNumber }, function(err, trip){
    if(err)
      return done(err);
    if(trip) {
      res.render('index', { title: 'This trip is already registered' });
      // return done(null, false, {message: 'That email is taken'});
    } else {

      var newTrip = new Trip();
      newTrip.checkedIn = false
      newTrip.firstName = firstName;
      newTrip.lastName = lastName;
      newTrip.confirmationNumber = confirmationNumber;
      newTrip.emailAddress = emailAddress;
      newTrip.dateSubmitted = dateSubmitted;
      newTrip.dateTimeDeparture = dateTimeDeparture;
      newTrip.timeZoneDeparture = timeZoneDeparture;
      newTrip.dateTimeZoneDeparture = dateTimeZoneDeparture;
      newTrip.dateToExecute = dateToExecute;

      newTrip.save(function(err){
        if(err) {
          throw err;
        } else {
          // SendMail(firstName, emailAddress, confirmationNumber, dateTimeZoneDeparture, 'newSuccess')
          res.render('index', { title: 'Trip has been registered' });
          // return done(null, newUser, { message: 'You successfully signed up.' });
        }
      })
    }
  });
  
});

module.exports = router;
