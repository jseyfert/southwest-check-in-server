var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment-timezone');
var Trip = require('../models/trip.js');
var SendMail = require('../config/email.js');
var router = express.Router();

// http://localhost:3000/submitCheckIn/john/seyfert/MWVE2L/johnseyfert@gmail.com/2017-12-06 16:40/PA
router.get('/:firstName/:lastName/:confirmationNumber/:emailAddress/:dateTimeDeparture/:timeZoneDeparture', function(req, res, next) {

  var firstName = req.params.firstName
  var lastName = req.params.lastName
  var confirmationNumber = req.params.confirmationNumber
  var emailAddress = req.params.emailAddress
  var dateTimeDeparture = req.params.dateTimeDeparture
  var timeZoneDeparture = req.params.timeZoneDeparture

  switch (timeZoneDeparture) {
    case 'HI':
      timeZoneDeparture = "Pacific/Honolulu"
      break
    case 'AL':
      timeZoneDeparture = "America/Anchorage"
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

  var dateTimeZoneDeparture = moment.tz(dateTimeDeparture, timeZoneDeparture).format();
  var dateToExecute = moment(dateTimeZoneDeparture).subtract(1, 'days').format();
  var date = new Date();
  var dateSubmitted = moment(date).format();
  // console.log('dateTimeDeparture', dateTimeDeparture);
  // console.log('timeZoneDeparture', timeZoneDeparture);
  // console.log('dateTimeZoneDeparture', dateTimeZoneDeparture);
  console.log('dateToExecute', dateToExecute);

  Trip.findOne({ confirmationNumber: confirmationNumber }, function(err, trip){
    if(err)
      return done(err);
    if(trip) {
      res.json({
        pageType: 'error',
        message: 'This trip is already registered',
      })
    } else {

      var newTrip = new Trip();
      newTrip.dateSubmitted = dateSubmitted;
      newTrip.checkedIn = false;
      newTrip.attempts = 0;
      newTrip.firstName = firstName;
      newTrip.lastName = lastName;
      newTrip.confirmationNumber = confirmationNumber;
      newTrip.emailAddress = emailAddress;
      newTrip.dateTimeDeparture = dateTimeDeparture;
      newTrip.timeZoneDeparture = timeZoneDeparture;
      newTrip.dateTimeZoneDeparture = dateTimeZoneDeparture;
      newTrip.dateToExecute = dateToExecute;

      newTrip.save(function(err){
        if(err) {
          throw err;
        } else {
          // SendMail(firstName, emailAddress, confirmationNumber, dateTimeZoneDeparture, 'newSuccess', null)
          res.json({
            pageType: 'success',
            dateToExecute: dateToExecute,
          })
        }
      })
    }
  });
  
});

module.exports = router;
