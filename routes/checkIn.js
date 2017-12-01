var express = require('express');
var router = express.Router();
const axios = require("axios");

router.get('/', function(req, res, next) {

var firstName = 'john'
var lastName = 'seyfert'
var confirmationNumber = 'LNUF87'
var emailAddress = 'johnseyfert@gmail.com'

const url1 = "https://www.southwest.com/air/check-in/index.html";
// headers: { 'Content-Type': 'application/json' },

const testUrl2 = "https://maps.googleapis.com/maps/api/geocode/json?address=austin";
const testUrl3 = "https://maps.googleapis.com/maps/api/geocode/json?address=boston";
const testUrl4 = "https://maps.googleapis.com/maps/api/geocode/json?address=denver";
const testUrl5 = "https://maps.googleapis.com/maps/api/geocode/json?address=missoula";

axios.get(testUrl2)
  .then((response) => {
    console.log(
      `City: ${response.data.results[0].formatted_address} -`,
      `Latitude: ${response.data.results[0].geometry.location.lat} -`,
      `Longitude: ${response.data.results[0].geometry.location.lng}`
    );
    return axios.get(testUrl3);
  })
  .then((response) => {
    console.log(
      `City: ${response.data.results[0].formatted_address} -`,
      `Latitude: ${response.data.results[0].geometry.location.lat} -`,
      `Longitude: ${response.data.results[0].geometry.location.lng}`
    );
    return axios.get(testUrl4);
  })
  .then((response) => {
    console.log(
      `City: ${response.data.results[0].formatted_address} -`,
      `Latitude: ${response.data.results[0].geometry.location.lat} -`,
      `Longitude: ${response.data.results[0].geometry.location.lng}`
    );
    return axios.get(testUrl5);
  })
  .then((response) => {
    console.log(
      `City: ${response.data.results[0].formatted_address} -`,
      `Latitude: ${response.data.results[0].geometry.location.lat} -`,
      `Longitude: ${response.data.results[0].geometry.location.lng}`
    );
  });
    
});

module.exports = router;


// yield scrapy.FormRequest(
//       "https://www.southwest.com/api/air-checkin/v1/air-checkin/page/air/check-in/review", 
//       method="POST",
//       headers={
//       'Content-Type': 'application/json',
//       'X-API-Key': 'l7xx944d175ea25f4b9c903a583ea82a1c4c'},
//       body='{"confirmationNumber":"' + self.confirmationNumber + '","passengerFirstName":"' + self.firstName + '","passengerLastName":"' + self.lastName + '","site":"southwest"}',
//       callback=self.parse2)



// axios.get(testUrl1)
// .then((response) => {
//   console.log('working')
//     axios.post(url2)
//     .then((response) => {
//         console.log(
//           `City: ${response.data.results[0].formatted_address} -`,
//           `Latitude: ${response.data.results[0].geometry.location.lat} -`,
//           `Longitude: ${response.data.results[0].geometry.location.lng}`
//         );
//         axios.post(url3)
//         .then((response) => {
//             console.log(
//               `City: ${response.data.results[0].formatted_address} -`,
//               `Latitude: ${response.data.results[0].geometry.location.lat} -`,
//               `Longitude: ${response.data.results[0].geometry.location.lng}`
//             );
//             axios.post(url4)
//             .then((response) => {
//                 console.log(
//                   `City: ${response.data.results[0].formatted_address} -`,
//                   `Latitude: ${response.data.results[0].geometry.location.lat} -`,
//                   `Longitude: ${response.data.results[0].geometry.location.lng}`
//                 );
//             })
//         })
//     })
// })






