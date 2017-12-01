//account for a general error in casea the site changes
var express = require('express');
var router = express.Router();
const axios = require("axios");

router.get('/', function(req, res, next) {

var firstName = 'john'
var lastName = 'seyfert'
var confirmationNumber = 'MWVE2L'
var emailAddress = 'johnseyfert@gmail.com'
// var confirmationNumber = 'LNUF87' // not found

const headers = {headers: {'Content-Type': 'application/json', 'X-API-Key': 'l7xx944d175ea25f4b9c903a583ea82a1c4c', } }

const url1 = "https://www.southwest.com/air/check-in/index.html";

const url2 = "https://www.southwest.com/api/air-checkin/v1/air-checkin/page/air/check-in/review";
// const data2 = JSON.stringify({
//   confirmationNumber:confirmationNumber, 
//   passengerFirstName:firstName, 
//   passengerLastName:lastName, 
//   site:"southwest"
// })


const url3 = "https://www.southwest.com/api/air-checkin/v1/air-checkin/page/air/check-in/confirmation";
// const data3 = JSON.stringify({
//   airportCheckInRequiredReservation:false,
//   confirmationNumber: confirmationNumber,
//   drinkCouponSelected:false,
//   electronicSystemTravelAuthorizationRequiredReservation:false,
//   international:false,
//   reprint:false,
//   token:token,
//   travelAuthorizationCheckNotPerformed:false,
//   travelerIdentifiers:[],
//   site:"southwest"
// })

const url4 = "https://www.southwest.com/api/air-checkin/v1/air-checkin/feature/mobile-boarding-pass";
// const data4 = JSON.stringify({
//   deliveryMethod:"EMAIL",
//   destination:emailAddress,
//   confirmationNumber:confirmationNumber,
//   drinkCouponSelected:false,
//   token:token,
//   site:"southwest",
// })


axios.get(url1)
  .then((response) => {
    console.log('working1');

    const data2 = JSON.stringify({
      confirmationNumber:confirmationNumber, 
      passengerFirstName:firstName, 
      passengerLastName:lastName, 
      site:"southwest"
    })

    return axios.post(url2, data2, headers)
    
  })
  .then((response) => {
    console.log('working22');
    let token = response.data.data.searchResults.token
    console.log('token',token);

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
    console.log('working333');
    let token = response.data.data.searchResults.token
    console.log('token',token);

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
    console.log('working4444');
    console.log('response.data', response.data);
  })
  .catch(error => {
      console.log(error.response.data.notifications.formErrors[0].code)
  });
    
});

module.exports = router;


// const testUrl2 = "https://maps.googleapis.com/maps/api/geocode/json?address=austin";
// const testUrl3 = "https://maps.googleapis.com/maps/api/geocode/json?address=boston";
// const testUrl4 = "https://maps.googleapis.com/maps/api/geocode/json?address=denver";
// const testUrl5 = "https://maps.googleapis.com/maps/api/geocode/json?address=missoula";


// console.log(
//   `City: ${response.data.results[0].formatted_address} -`,
//   `Latitude: ${response.data.results[0].geometry.location.lat} -`,
//   `Longitude: ${response.data.results[0].geometry.location.lng}`
// );

// const headers = {'Content-Type': 'application/json', 'X-API-Key': 'l7xx944d175ea25f4b9c903a583ea82a1c4c'}

// SignIn = () => {
//     console.log('login clicked')
//     // let data = JSON.stringify({
//     //     password: this.state.password,
//     //     username: this.state.email
//     // })
//     let data = JSON.stringify({
//       confirmationNumber:confirmationNumber, 
//       passengerFirstName:firstName, 
//       passengerLastName:lastName, 
//       site:"southwest"
//     })

//     axios.post(url2, data, {
//         headers: {
//             'Content-Type': 'application/json',
//             'X-API-Key': 'l7xx944d175ea25f4b9c903a583ea82a1c4c',
//         }
//     }
//     )
//       .then((response) => {
//         console.log('asdfasfdasfasdfasdfasdfadsf');
//         // console.log('headers', headers);
//         // console.log('data', data);
//         // console.log(
//         //   `City: ${response.data.results[0].formatted_address} -`,
//         //   `Latitude: ${response.data.results[0].geometry.location.lat} -`,
//         //   `Longitude: ${response.data.results[0].geometry.location.lng}`
//         // );
//         // return axios.post(url2, data, headers);
//       })
//         .catch(error => {
//             console.log(error.response.data.notifications.formErrors[0].code)
//         });
// }

// SignIn()
