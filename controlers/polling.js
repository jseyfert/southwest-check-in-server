const mongoose = require('mongoose');
const axios = require("axios");
const moment = require('moment-timezone');
const Trip = require('../models/trip.js');
const SendMail = require('../config/email.js');

var polling = function(){

  var date = new Date();
  var now = moment(date).format();
  var thirtyMinAgo = moment(date).subtract(30, 'minute').format();  
  var inTwoMin = moment(date).add(2, 'minute').format();
  console.log('thirtyMinAgo           = ',thirtyMinAgo);
  console.log('now                    = ',now);
  console.log('inTwoMin               = ',inTwoMin);

  Trip.find({ checkedIn: false, errorEmailSent: false, dateToExecute: {$gte: thirtyMinAgo, $lt: inTwoMin}}, function(err, trip){
    if(err)
      return done(err);
    if(trip.length > 0) {
      // console.log('==========> trip found');

    trip.forEach(function(obj){
      let firstName = obj.firstName
      let lastName = obj.lastName
      let confirmationNumber = obj.confirmationNumber
      let emailAddress = obj.emailAddress

      let dateToExecute = obj.dateToExecute
      console.log('dateToExecute          = ',dateToExecute)

      var url = "http://localhost:3000/checkIn/" + firstName + "/" + lastName + "/" + confirmationNumber + "/" + emailAddress
      console.log("url", url);

      axios.get(url)
        .then((response) => {
          // console.log('here -=-=-=-=-',response.data)
          let message = response.data.message
          let firstName = response.data.firstName
          let lastName = response.data.lastName
          let confirmationNumber = response.data.confirmationNumber
          let emailAddress = response.data.emailAddress
          console.log('===>', message, firstName, lastName, confirmationNumber, emailAddress);
          // message = 'checkedIn'
          if (message === 'checkedIn') {
            // console.log('checkedIn', firstName, confirmationNumber);
            SendMail(firstName, emailAddress, confirmationNumber, null, 'checkinSuccess', null)
            Trip.findOneAndUpdate({'confirmationNumber': confirmationNumber}, {'checkedIn': true}, function (err, resp) {
              if(err){
                console.log(err)
              } else {
                console.log('trip has been updated in the DB as checkedIn');
              }
            });
          } else {
            Trip.findOne({ confirmationNumber: confirmationNumber }, function(err, trip){
              if(err)
                console.log(err);
              if(trip) {
                var attempts = trip.attempts
                attempts += 1;
                var errorEmailSent = trip.errorEmailSent
                console.log(attempts, errorEmailSent)

                if (attempts <= 4 && !errorEmailSent ){
                  Trip.findOneAndUpdate({'confirmationNumber': confirmationNumber}, {'attempts': attempts}, function (err, resp) {
                    if(err){
                      console.log(err)
                    } else {
                      console.log('attempts updated in the DB to = ' + attempts);
                    }
                  });
                } else {
                  SendMail(firstName, emailAddress, confirmationNumber, null, 'checkinError', message)
                  Trip.findOneAndUpdate({'confirmationNumber': confirmationNumber}, {'errorEmailSent': true}, function (err, resp) {
                    if(err){
                      console.log(err)
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
          // body = error.response.data
          console.log("polling.js > ERROR");
          // console.log(body);
        });
      })

    } else {
      console.log('==========> no trip');
    }
  });
}

module.exports = polling;