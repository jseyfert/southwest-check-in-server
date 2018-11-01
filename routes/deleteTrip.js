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
      //   // data: [],
      // })
    if(trip) {
      console.log('deleted',trip)
      res.json({
        pageType: 'tripDeleted',
        // message: 'trip deleted',
        // data: [trip],
      })
    } else {
      console.log('not found',err)
      // res.json({
      //   pageType: 'tripsError',
      //   message: 'Could not delete trip',
      //   // data: [],
      // })
    }
  });
});

module.exports = router;

// http://localhost:3001/deleteTrip/5a34e474ead1ac04411b1ae5
// http://ec2-52-35-164-107.us-west-2.compute.amazonaws.com:3001/deleteTrip/5a34e474ead1ac04411b1ae5