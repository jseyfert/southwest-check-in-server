const mongoose = require('mongoose');
const axios = require("axios");
const moment = require('moment-timezone');
const Trip = require('../models/trip.js');
const SendMail = require('../config/email.js');

var polling = function(){

  var date = new Date();
  var thirtyMinAgo = moment(date).subtract(30, 'minute').format();  
  var inTwoMin = moment(date).add(2, 'minute').format();

  Trip.find({ checkedIn: false, errorEmailSent: false, dateToExecute: {$gte: thirtyMinAgo, $lt: inTwoMin}}, function(err, trip){
    if(err)
      return done(err);
    if(trip.length > 0) {
      console.log('==========> trip(s) found');
      trip.forEach(function(obj){
        let firstName = obj.firstName
        let lastName = obj.lastName
        let confirmationNumber = obj.confirmationNumber
        let emailAddress = obj.emailAddress
        let dateToExecute = obj.dateToExecute
        // console.log('thirtyMinAgo           = ',thirtyMinAgo);
        // console.log('dateToExecute          = ',dateToExecute)
        // console.log('inTwoMin               = ',inTwoMin);

        var url = "http://localhost:3000/checkIn/" + firstName + "/" + lastName + "/" + confirmationNumber + "/" + emailAddress
        axios.get(url)
          .then((response) => {
            let message = response.data.message
            let lastName = response.data.lastName
            let firstName = response.data.firstName
            let emailAddress = response.data.emailAddress
            let confirmationNumber = response.data.confirmationNumber
            if (message === 'checkedIn') {
              SendMail(firstName, emailAddress, confirmationNumber, null, 'checkinSuccess', null)
              Trip.findOneAndUpdate({'confirmationNumber': confirmationNumber}, {'checkedIn': true}, function (err, resp) {
                if(err){
                  return done(err);
                } else {
                  console.log('trip has been updated in the DB as checkedIn');
                }
              });
            } else {
              Trip.findOne({ confirmationNumber: confirmationNumber }, function(err, trip){
                if(err)
                  return done(err);;
                if(trip) {
                  var errorEmailSent = trip.errorEmailSent
                  var attempts = trip.attempts
                  attempts += 1;
                  if (attempts <= 4 && !errorEmailSent ){
                    Trip.findOneAndUpdate({'confirmationNumber': confirmationNumber}, {'attempts': attempts}, function (err, resp) {
                      if(err){
                        return done(err);
                      } else {
                        console.log('attempts updated in the DB to = ' + attempts + ' & errorEmailSent = ' + errorEmailSent);
                      }
                    });
                  } else {
                    SendMail(firstName, emailAddress, confirmationNumber, null, 'checkinError', message)
                    Trip.findOneAndUpdate({'confirmationNumber': confirmationNumber}, {'errorEmailSent': true}, function (err, resp) {
                      if(err){
                        return done(err);
                      } else {
                        console.log('trip has been updated in the DB as errorEmailSent = true');
                      }
                    });
                  }
                } 
              });
            }
          })
          .catch(error => {
            console.log("polling.js > ERROR");
            return done(err);
          });
        })
    } else {
      // console.log('==========> no trip');
    }
  });
}

module.exports = polling;