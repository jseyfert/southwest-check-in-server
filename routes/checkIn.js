const express = require('express');
const router = express.Router();
const axios = require("axios");

router.get('/:firstName/:lastName/:confirmationNumber/:emailAddress', function(req, res, next) {

let firstName = req.params.firstName
let lastName = req.params.lastName
let confirmationNumber = req.params.confirmationNumber
let emailAddress = req.params.emailAddress

const headers = {headers: {'Content-Type': 'application/json', 'X-API-Key': 'l7xx944d175ea25f4b9c903a583ea82a1c4c', } }
const url1 = "https://www.southwest.com/air/check-in/index.html";
const url2 = "https://www.southwest.com/api/air-checkin/v1/air-checkin/page/air/check-in/review";
const url3 = "https://www.southwest.com/api/air-checkin/v1/air-checkin/page/air/check-in/confirmation";
const url4 = "https://www.southwest.com/api/air-checkin/v1/air-checkin/feature/mobile-boarding-pass";

axios.get(url1)
  .then((response) => {

    const data2 = JSON.stringify({
      confirmationNumber:confirmationNumber, 
      passengerFirstName:firstName, 
      passengerLastName:lastName, 
      application:"air-check-in",
      site:"southwest"
    })

    // console.log('checking.js > working1');

    return axios.post(url2, data2, headers)

  })
  .then((response) => {
    let token = response.data.data.searchResults.token
    // console.log('checking.js > working22');
    // console.log('token',token);

    const data3 = JSON.stringify({
      airportCheckInRequiredReservation:false,
      confirmationNumber: confirmationNumber,
      drinkCouponSelected:false,
      electronicSystemTravelAuthorizationRequiredReservation:false,
      international:false,
      reprint:false,
      token:token,
      travelAuthorizationCheckNotPerformed:false,
      travelerIdentifiers:[],
      site:"southwest"
    })

    return axios.post(url3, data3, headers)

  })
  .then((response) => {
    let token = response.data.data.searchResults.token
    // console.log('checking.js > working333');
    // console.log('token',token);

    const data4 = JSON.stringify({
      deliveryMethod:"EMAIL",
      destination:emailAddress,
      confirmationNumber:confirmationNumber,
      drinkCouponSelected:false,
      token:token,
      site:"southwest",
    })

    return axios.post(url4, data4, headers)

  })
  .then((response) => {
    // console.log('checking.js > working4444', response.data.success);
    res.json({ 
      message: 'checkedIn',
      firstName: firstName,
      lastName: lastName,
      confirmationNumber: confirmationNumber,
      emailAddress: emailAddress,
      })
    // { data: null, success: true, notifications: null } // this is the final json that is returned
  })
  .catch(error => {
    body = error.response.data
    if ('httpStatusCode' in body){
      let message = error.response.data.httpStatusCode
      // console.log('checking.js > error one ===>', message);
      res.json({ 
        message: message,
        firstName: firstName,
        lastName: lastName,
        confirmationNumber: confirmationNumber,
        emailAddress: emailAddress,
        })
    } 
    else if(body.notifications.fieldErrors !== null) {
      let message = error.response.data.notifications.fieldErrors[0].code
      // console.log('checking.js > error two ===>', message);
      res.json({ 
        message: message,
        firstName: firstName,
        lastName: lastName,
        confirmationNumber: confirmationNumber,
        emailAddress: emailAddress,
        })
    } 
    else {
      let message = error.response.data.notifications.formErrors[0].code
      // console.log('checking.js > error three ===>', message);
      res.json({ 
        message: message,
        firstName: firstName,
        lastName: lastName,
        confirmationNumber: confirmationNumber,
        emailAddress: emailAddress,
        })
    }
  });
});

module.exports = router;