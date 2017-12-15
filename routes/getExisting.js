var express = require('express');
var mongoose = require('mongoose');
var Trip = require('../models/trip.js');
var router = express.Router();

router.get('/:confirmationNumber', function(req, res, next) {

  var confirmationNumber = req.params.confirmationNumber

  if (confirmationNumber === 'showall'){
    Trip.find({}, function(err, trips) {
      if(err){
        res.send(err);
      } else {
        res.json({
          pageType: 'tripsSuccess',
          message: 'Here is your trip',
          data: trips,
        })
      }
    })
  } else {
    Trip.findOne({ confirmationNumber: confirmationNumber }, function(err, trip){
      if(err)
        res.json({
          pageType: 'tripsError',
          message: 'getExisting.js > Trip.findOne',
          data: [],
        })
      if(trip) {
        res.json({
          pageType: 'tripsSuccess',
          message: 'Here is your trip',
          data: [trip],
        })
      } else {
        res.json({
          pageType: 'tripsError',
          message: 'Could not find trip',
          data: [],
        })
      }
    });
  }
});

module.exports = router;



// http://localhost:3001/getExisting/MWVE2L