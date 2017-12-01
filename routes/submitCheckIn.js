var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var newTrip = require('../models/trip.js');


router.get('/:firstName/:lastName/:confirmationNumber/:emailAddress', function(req, res, next) {

// http://localhost:3000/submitCheckIn/john/seyfert/MWVE2L/johnseyfert@gmail.com

  var firstName = req.params.firstName
  var lastName = req.params.lastName
  var confirmationNumber = req.params.confirmationNumber
  var emailAddress = req.params.emailAddress
  var dateSubmitted = req.params.dateSubmitted

*** work on writing data to the DB  &&&& add date/time/timezone of where you are flying out of


  // newTrip.save(function(err){
  //   if(err) {
  //     throw err;
  //   } else {
  //     console.log('worked');
  //     // SendMail(req.body.user, email, link, null)
  //     // return done(null, newUser, { message: 'You successfully signed up.' });
  //   }
  // })

  //     UserModel.findOne({'passwordResetToken': passwordResetToken}, function (err, user) {
  //       if(err){
  //         return console.log('error', err);
  //       } else if (user){
  //         if (user.passwordResetExpires > Date.now()) {
  //           // console.log('password is ready to be updated');
  //           res.json({
  //             message: {message: 'The token worked! Password is ready to be updated', alert: 'alert alert-success'},
  //             activeComponent: 'resetPassword',
  //             passwordResetToken: passwordResetToken
  //           })
  //         } else {
  //           // console.log('The token is expired');
  //           res.json({
  //             message: {message: "The token is expired", alert: 'alert alert-danger'},
  //             activeComponent: 'confirmToken'
  //           })
  //         }
  //       } else {
  //           // console.log('The token is wrong');
  //           res.json({
  //             message: {message: "The token is wrong", alert: 'alert alert-danger'},
  //             activeComponent: 'confirmToken',
  //           })
  //       }
  //     }); 
  // },

  res.render('index', { title: 'MONGO' });

});

module.exports = router;



// var MongoClient = require('mongodb').MongoClient

// MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
//   if (err) throw err

//   db.collection('mammals').find().toArray(function (err, result) {
//     if (err) throw err

//     console.log(result)
//   })
// })

// <option value="" selected="selected">select your timezone</option>
// <option value="(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima">(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima</option>
// <option value="(GMT -6:00) Central Time (US & Canada), Mexico City">(GMT -6:00) Central Time (US & Canada), Mexico City</option>
// <option value="(GMT -7:00) Mountain Time (US & Canada)">(GMT -7:00) Mountain Time (US & Canada)</option>
// <option value="(GMT -8:00) Pacific Time (US & Canada)">(GMT -8:00) Pacific Time (US & Canada)</option>
// <option value="(GMT -9:00) Alaska">(GMT -9:00) Alaska</option>