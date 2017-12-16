var express = require('express');
var mongoose = require('mongoose');
var Trip = require('../models/trip.js');
var router = express.Router();

router.get('/:_id', function(req, res, next) {

  var id = req.params._id

  Trip.findByIdAndRemove(id, function(err, trip){
    if(err)
      console.log('err',err)
      // res.json({
      //   pageType: 'tripsError',
      //   message: 'getExisting.js > Trip.findOne',
      //   data: [],
      // })
    if(trip) {
      console.log('deleted',trip)
      res.json({
        // pageType: 'landing',
        message: 'deleted',
        // data: [trip],
      })
    } else {
      console.log('not found',err)
      // res.json({
      //   pageType: 'landing',
      //   message: 'Could not find trip',
      //   data: [],
      // })
    }
  });
});

module.exports = router;

// http://localhost:3001/deleteTrip/5a34e44d330f9d0416396cf4