const mongoose = require('mongoose');
const axios = require("axios");
const moment = require('moment-timezone');
const Trip = require('../models/trip.js');
const SendMail = require('../config/email.js');

var polling = function(){

  console.log('The answer to life, the universe, and everything!');

  var date = new Date();
  var date = moment(date);
  // var oneMinAgo = moment(date).subtract(1, 'minute');
  // var inFourMin = moment(date).add(4, 'minute');

  var oneMinAgo = moment(date).subtract(10, 'day');
  var inTenMin = moment(date).add(10, 'day');

  // console.log(oneMinAgo.format());
  // console.log(date.format());
  // console.log(inTenMin.format());

    Trip.find({ checkedIn: false, dateToExecute: {$gte: oneMinAgo.toDate(), $lt: inTenMin.toDate()}}, function(err, trip){
      if(err)
        return done(err);
      if(trip.length > 0) {
        console.log('polling.js > ==========> trip found');

        trip.forEach(function(obj){
          var firstName = obj.firstName
          var lastName = obj.lastName
          var confirmationNumber = obj.confirmationNumber
          var emailAddress = obj.emailAddress
          var url = "http://localhost:3000/checkIn/" + firstName + "/" + lastName + "/" + confirmationNumber + "/" + emailAddress

          console.log(url);

          axios.get(url)
            .then((response) => {
              let message = response.data.message
              let firstName = response.data.firstName
              let lastName = response.data.lastName
              let confirmationNumber = response.data.confirmationNumber
              let emailAddress = response.data.emailAddress
              console.log('response.data', message, firstName, lastName, confirmationNumber, emailAddress);

              if (message === 'checkedIn') {
                console.log('checkedIn', firstName, confirmationNumber);
                SendMail(firstName, emailAddress, confirmationNumber, null, 'checkinSuccess')

                **** update record to checked in
              } else {
                console.log('in not checked in');
                SendMail(firstName, emailAddress, confirmationNumber, null, 'checkinError')

                *** figure out when to send email and when not to
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