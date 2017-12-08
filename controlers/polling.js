const mongoose = require('mongoose');
const axios = require("axios");
const moment = require('moment-timezone');
const Trip = require('../models/trip.js');
const SendMail = require('../config/email.js');

var polling = function(){

  var date = new Date();
  var now = moment(date).format();
  var oneMinAgo = moment(date).subtract(1, 'minute').format();  
  var inThreeMin = moment(date).add(13, 'minute').format();
  // var oneMinAgoFormatted = oneMinAgo.toDate()
  // var inThreeMinFormatted = inThreeMin.toDate()
  console.log('oneMinAgo            = ',oneMinAgo);
  // console.log('oneMinAgoFormatted   = ',oneMinAgoFormatted);
  console.log('inThreeMin           = ',inThreeMin);
  // console.log('inThreeMinFormatted  = ',inThreeMinFormatted);
  // .toDate()

  Trip.find({ checkedIn: false, dateToExecute: {$gte: oneMinAgo, $lt: inThreeMin}}, function(err, trip){
    if(err)
      return done(err);
    if(trip.length > 0) {
      console.log('polling.js > ==========> trip found');

    trip.forEach(function(obj){
      let firstName = obj.firstName
      let lastName = obj.lastName
      let confirmationNumber = obj.confirmationNumber
      let emailAddress = obj.emailAddress

      var url = "http://localhost:3000/checkIn/" + firstName + "/" + lastName + "/" + confirmationNumber + "/" + emailAddress
      // console.log(url);

      axios.get(url)
        .then((response) => {
          let message = response.data.message
          let firstName = response.data.firstName
          let lastName = response.data.lastName
          let confirmationNumber = response.data.confirmationNumber
          let emailAddress = response.data.emailAddress
          // let attempts = response.data.attempts
          console.log('response.data', message, firstName, lastName, confirmationNumber, emailAddress);
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
                // console.log('attempts', attempts)

                // var date = moment(date);
                // var fourMinAgo = moment(date).subtract(4, 'minute');
                // var dateToExecute = trip.dateToExecute

                if (attempts < 0 ){
                  console.log('in attempts')
                }




                // if (fourMinAgo > dateToExecute || attempts){
                //   SendMail(firstName, emailAddress, confirmationNumber, null, 'checkinError', message)
                //   Trip.findOneAndUpdate({'confirmationNumber': confirmationNumber}, {'attempts': true}, function (err, resp) {
                //     if(err){
                //       console.log(err)
                //     } else {
                //       console.log('trip has been updated in the DB as attempts = true');
                //     }
                //   });
                // }
              } 

            });

          }

        })
        .catch(error => {
          body = error.response.data
          console.log("polling.js > ERROR");
          console.log(body);
        });
      })

    } else {
      console.log('polling.js > ==========> no trip');
    }
  });
}

module.exports = polling;