var mongoose = require('mongoose');

var TripSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  confirmationNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  dateSubmitted: { type: Date, required: true },
  dateTimeZoneDeparture: { type: Date, required: true },
});

module.exports = mongoose.model('Trip', TripSchema);