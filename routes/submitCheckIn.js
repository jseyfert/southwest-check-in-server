var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment-timezone');
var Trip = require('../models/trip.js');
var SendMail = require('../config/email.js');
var router = express.Router();

router.get('/:firstName/:lastName/:confirmationNumber/:emailAddress/:dateTimeDeparture/:timeZoneDeparture/:dateTimeReturn/:timeZoneReturn', function(req, res, next) {
  

  var firstName = req.params.firstName
  var lastName = req.params.lastName
  var confirmationNumber = req.params.confirmationNumber
  var emailAddress = req.params.emailAddress

  var date = new Date();
  var dateSubmitted = moment(date).format();


// one way trip
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
  var dateTimeDeparture = req.params.dateTimeDeparture
  var dateTimeZoneDeparture = moment.tz(dateTimeDeparture, timeZoneDeparture).format();
  var dateToExecute = moment(dateTimeZoneDeparture).subtract(1, 'days');
  var formatdateToExecute = dateToExecute.format('MMMM Do YYYY, h:mm a') + ' PST'
  var dateToExecute = dateToExecute.format();
  console.log('formatdateToExecute', formatdateToExecute)
  console.log('dateTimeDeparture', dateTimeDeparture);
  console.log('timeZoneDeparture', timeZoneDeparture);
  console.log('dateTimeZoneDeparture', dateTimeZoneDeparture);
  console.log('dateToExecute', dateToExecute);

  Trip.findOne({ confirmationNumber: confirmationNumber }, function(err, trip){
    
    if(err)
      res.json({
        pageType: 'error',
        message: 'submitCheckin.js > Trip.findOne',
        dateToExecute: '',
      })
    if(trip) {
      res.json({
        pageType: 'error',
        message: 'This trip is already registered',
        dateToExecute: '',
      })
    } else {
      var newTrip = new Trip();
      newTrip.dateSubmitted = dateSubmitted
      newTrip.checkedIn = false;
      newTrip.errorEmailSent = false;
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
          console.log(err)
          res.json({
            pageType: 'error',
            message: 'submitCheckin.js > newTrip.save',
            dateToExecute: '',
          })
        } else {
          SendMail(firstName, emailAddress, confirmationNumber, dateTimeDeparture, timeZoneDeparture, 'newSuccess', null)
          res.json({
            pageType: 'success',
            message: '',
            dateToExecute: formatdateToExecute,
          })
        }
      })
    }
  });





//return trip
  var dateTimeReturn = req.params.dateTimeReturn
  if (dateTimeReturn != 'T') {

    var timeZoneReturn = req.params.timeZoneReturn
    switch (timeZoneReturn) {
      case 'HI':
        timeZoneReturn = "Pacific/Honolulu"
        break
      case 'AL':
        timeZoneReturn = "America/Anchorage"
        break
      case 'PA':
        timeZoneReturn = "America/Los_Angeles" 
        break
      case 'MT':
        timeZoneReturn = "America/Denver" 
        break
      case 'CE':
        timeZoneReturn = "America/Chicago"
        break
      case 'ES':
        timeZoneReturn = "America/New_York"
        break
      default:
        timeZoneReturn = "ERROR"
    }

    var dateTimeZoneReturn = moment.tz(dateTimeReturn, timeZoneReturn).format();
    var dateToExecuteReturn = moment(dateTimeZoneReturn).subtract(1, 'days');
    var formatdateToExecuteReturn = dateToExecuteReturn.format('MMMM Do YYYY, h:mm a') + ' PST'
    var dateToExecuteReturn = dateToExecuteReturn.format();
    console.log('============================================')
    console.log('formatdateToExecuteReturn', formatdateToExecuteReturn)
    console.log('dateTimeReturn', dateTimeReturn);
    console.log('timeZoneReturn', timeZoneReturn);
    console.log('dateTimeZoneReturn', dateTimeZoneReturn);
    console.log('dateToExecuteReturn', dateToExecuteReturn);


    Trip.findOne({ confirmationNumber: confirmationNumber, dateTimeReturn: dateTimeReturn }, function(err, trip){
      if(err)
        console.log(err)
      if(trip) {
        console.log('!!! in trip registered already', trip)
      } else {
        var newTrip = new Trip();
        newTrip.dateSubmitted = dateSubmitted
        newTrip.checkedIn = false;
        newTrip.errorEmailSent = false;
        newTrip.attempts = 0;
        newTrip.firstName = firstName;
        newTrip.lastName = lastName;
        newTrip.confirmationNumber = confirmationNumber;
        newTrip.emailAddress = emailAddress;
        
        newTrip.dateTimeDeparture = dateTimeReturn;
        newTrip.timeZoneDeparture = timeZoneReturn;
        newTrip.dateTimeZoneDeparture = dateTimeZoneReturn;
        newTrip.dateToExecute = dateToExecuteReturn;

        newTrip.save(function(err){
          if(err) {
            console.log(err)
          } else {
            SendMail(firstName, emailAddress, confirmationNumber, dateTimeReturn, timeZoneReturn, 'returnSuccess', null)
          }
        })
      }
    });
  }
});

module.exports = router;
